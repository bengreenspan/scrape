import logging
import csv
import re
import time
import os
from bs4 import BeautifulSoup
from datetime import datetime, timedelta
from typing import Optional, List, Tuple

from . import client, config

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

DATE_TOLERANCE = timedelta(days=2)


class PRInfo:
    def __init__(
        self, url: str, ts_raw: Optional[str] = None, ts_iso: Optional[str] = None
    ):
        self.url = url
        self.ts_raw = ts_raw
        self.ts_iso = ts_iso


def normalize_headline(headline: str) -> str:
    """Normalize curly quotes to straight quotes."""
    if headline is None:
        return ""
    return (
        headline.replace("“", '"').replace("”", '"').replace("‘", "'").replace("’", "'")
    )


def normalize_for_compare(text: str) -> str:
    """
    Normalize text for strict headline comparison:
      - normalize curly quotes
      - lowercase
      - collapse whitespace
    """
    if text is None:
        return ""
    text = normalize_headline(text)
    text = text.lower()
    text = re.sub(r"\s+", " ", text)
    return text.strip()


def _is_gnw_release_url(url: str) -> bool:
    """Checks if URL is a valid GNW news-release."""
    if not url:
        return False
    return "globenewswire.com" in url and "news-release" in url


def _calculate_date_window(feed_date_str: str) -> Tuple[str, str]:
    """
    Given a feed date string like '03/31/2023 09:15:00' (or '03/31/2023'),
    compute a (start_date, end_date) window as ISO YYYY-MM-DD strings,
    offset by DATE_TOLERANCE on each side.
    """
    feed_date_str = (feed_date_str or "").strip()
    if not feed_date_str:
        return "", ""

    # Take only the date part before any whitespace
    date_part = feed_date_str.split()[0]

    try:
        # Assuming US format: MM/DD/YYYY
        input_date = datetime.strptime(date_part, "%m/%d/%Y").date()
    except ValueError as e:
        logger.warning(
            "Failed to parse date for date window: %s (error: %s)", feed_date_str, e
        )
        return "", ""

    start_date = input_date - DATE_TOLERANCE
    end_date = input_date + DATE_TOLERANCE
    return start_date.strftime("%Y-%m-%d"), end_date.strftime("%Y-%m-%d")


def _build_query(
    ticker: str, text: str, date_window: Tuple[str, str], use_ticker: bool
) -> str:
    """
    Build a Google CSE query for GNW.

    - Always restrict to site:globenewswire.com/news-release
    - If use_ticker is True, require the ticker string.
    - 'text' is either the full headline, a short headline, or the ticker itself.
    - date_window is (start, end) in YYYY-MM-DD; if non-empty, we add after:/before:.
    """
    base = "site:globenewswire.com/news-release"

    parts: List[str] = [base]

    text = (text or "").strip()
    ticker = (ticker or "").strip()

    if text:
        # Prefer quoted phrase searches for headlines so we don't drift too far
        if " " in text:
            parts.append(f'"{text}"')
        else:
            parts.append(text)

    if use_ticker and ticker:
        parts.append(ticker)

    start, end = date_window
    if start and end:
        parts.append(f"after:{start}")
        parts.append(f"before:{end}")

    return " ".join(parts)


def _search_web_api(
    ticker: str, text: str, date_window: Tuple[str, str], use_ticker: bool
) -> List[str]:
    """
    Perform a single Google Custom Search query and return a list of GNW news-release URLs
    (possibly empty) for this query.
    """
    if not config.GOOGLE_API_KEY or not config.GOOGLE_SEARCH_CX:
        logger.error("Google API key or search CX is not configured.")
        return []

    query = _build_query(ticker, text, date_window, use_ticker)
    logger.info("-> Google CSE query: %s", query)

    try:
        response = client.get(
            "https://www.googleapis.com/customsearch/v1",
            params={
                "key": config.GOOGLE_API_KEY,
                "cx": config.GOOGLE_SEARCH_CX,
                "q": query,
                "num": 10,  # ask for more than 3 so we don't miss GNW if it's not ranked at the very top
            },
        )
    except Exception as e:
        logger.warning("Google CSE request failed: %s", e)
        return []

    try:
        data = response.json()
    except ValueError as e:
        logger.warning("Failed to decode Google CSE JSON: %s", e)
        return []

    items = data.get("items") or []
    urls: List[str] = []
    for item in items:
        url = item.get("link")
        if _is_gnw_release_url(url):
            urls.append(url)

    return urls


def extract_timestamp_from_gnw(
    gnw_url: str,
    feed_date_str: str,
    expected_headline: Optional[str] = None,
) -> Optional[PRInfo]:
    """
    Scrapes the GNW page for the official timestamp, verifies the headline if provided,
    and checks the date against the input date.

    Returns PRInfo if both headline and date validation pass (if applicable),
    otherwise returns None.
    """
    try:
        # Expect feed_date_str like 'MM/DD/YYYY' or 'MM/DD/YYYY HH:MM:SS'
        date_part = (feed_date_str or "").split()[0].strip()
        input_date = datetime.strptime(date_part, "%m/%d/%Y").date()
    except ValueError:
        logger.error(
            "Input date format error: '%s'. Expected 'MM/DD/YYYY'. Cannot perform date check.",
            feed_date_str,
        )
        input_date = None

    pr_info = PRInfo(url=gnw_url)

    try:
        logger.info("-> Fetching GNW page for validation: %s", gnw_url)
        response = client.get(gnw_url)
        soup = BeautifulSoup(response.text, "lxml")

        # --- Headline verification ---
        if expected_headline is not None:
            page_headline: Optional[str] = None

            h1 = soup.find("h1")
            if h1 and h1.get_text(strip=True):
                page_headline = h1.get_text(strip=True)

            if not page_headline and soup.title and soup.title.get_text(strip=True):
                page_headline = soup.title.get_text(strip=True)

            if page_headline:
                expected_norm = normalize_for_compare(expected_headline)
                page_norm = normalize_for_compare(page_headline)

                if expected_norm != page_norm:
                    logger.warning(
                        "-> Headline check FAILED: Expected '%s' but GNW page has '%s'. Discarding this URL.",
                        expected_headline,
                        page_headline,
                    )
                    return None
            else:
                logger.warning(
                    "-> Could not find a headline on the GNW page to verify. Discarding this URL."
                )
                return None

        # --- Timestamp extraction ---
        page_text = soup.get_text(" ", strip=True)

        ts_pattern = re.compile(
            r"([A-Z][a-z]+ \d{1,2}, \d{4} \d{1,2}:\d{2}(?::\d{2})?(?: [AP]M)? ET)"
        )
        match = ts_pattern.search(page_text)
        if not match:
            logger.warning(
                "-> No recognizable timestamp found on GNW page for %s", gnw_url
            )
            return None

        ts_raw = match.group(1)
        pr_info.ts_raw = ts_raw

        parsed_dt: Optional[datetime] = None
        for fmt in (
            "%B %d, %Y %I:%M %p ET",
            "%B %d, %Y %H:%M ET",
            "%B %d, %Y %I:%M:%S %p ET",
            "%B %d, %Y %H:%M:%S ET",
        ):
            try:
                parsed_dt = datetime.strptime(ts_raw, fmt)
                break
            except ValueError:
                continue

        if not parsed_dt:
            logger.warning(
                "-> Could not parse GNW timestamp '%s' for %s", ts_raw, gnw_url
            )
            return None

        pr_info.ts_iso = parsed_dt.strftime("%Y-%m-%dT%H:%M:%S")

        if input_date is not None:
            gnw_date = parsed_dt.date()
            date_difference = abs(input_date - gnw_date)

            if date_difference <= DATE_TOLERANCE:
                logger.info(
                    "-> Date check SUCCESS: Input date %s is within %d days of GNW date %s.",
                    input_date,
                    DATE_TOLERANCE.days,
                    gnw_date,
                )
                return pr_info
            else:
                logger.warning(
                    "-> Date check FAILED: Difference is %d days. Discarding this URL.",
                    date_difference.days,
                )
                return None

        # If we couldn't parse the input date, still return timestamp info
        return pr_info

    except Exception as e:
        logger.error("An error occurred during GNW extraction for %s: %s", gnw_url, e)
        return None


def search_gnw_prinfo_for_headline(
    ticker: str,
    headline: str,
    feed_date_str: str,
) -> Optional[PRInfo]:
    """
    Master search: for a given row (ticker, headline, date), try multiple Google
    modes and, for each mode, multiple candidate GNW URLs. The first URL that
    passes both headline and date validation is returned as PRInfo.

    If no URL passes validation, returns None.
    """
    clean_headline = normalize_headline(headline or "")
    short_headline = " ".join(clean_headline.split()[:7])  # first 7 words

    date_window = _calculate_date_window(feed_date_str)

    def dw(use_dates: bool) -> Tuple[str, str]:
        return date_window if use_dates else ("", "")

    search_modes: List[tuple] = [
        ("Ticker+full headline+date", True, clean_headline, True),
        ("Ticker+short headline+date", True, short_headline, True),
        ("Headline-only+date", False, short_headline, True),
        ("Ticker+full headline (no date)", True, clean_headline, False),
        ("Ticker-only+date", False, ticker, True),
        ("Ticker-only (no date)", False, ticker, False),
    ]

    for label, use_ticker, text, use_dates in search_modes:
        logger.info("-> Google search mode: %s", label)
        candidate_urls = _search_web_api(
            ticker, text, dw(use_dates), use_ticker=use_ticker
        )

        if not candidate_urls:
            continue

        for url in candidate_urls:
            logger.info("-> Trying candidate GNW URL: %s", url)
            pr_info = extract_timestamp_from_gnw(
                url, feed_date_str, expected_headline=headline
            )
            if pr_info is not None:
                # Found a URL that passes both headline + date checks
                logger.info("-> Accepted GNW URL for this row: %s", url)
                return pr_info

        logger.info("-> No candidate URLs passed validation for search mode: %s", label)

    logger.info("-> No GNW match found via Google for this row after all modes.")
    return None


def process_file(input_csv: str, output_csv: str) -> None:
    """
    Main driver: read the input CSV, append GNW timestamps into the output CSV.
    Input format: Date, Ticker, Headline (headline may contain commas).
    """
    if not os.path.exists(input_csv):
        logger.error("Input file %s not found.", input_csv)
        return

    processed_rows = 0
    if os.path.exists(output_csv):
        with open(
            output_csv, "r", newline="", encoding="utf-8", errors="replace"
        ) as f_out_check:
            reader_check = csv.reader(f_out_check)
            processed_rows = sum(1 for _ in reader_check) - 1
            processed_rows = max(0, processed_rows)
            logger.info(
                "Found %d previously processed rows in %s. Resuming from row %d.",
                processed_rows,
                output_csv,
                processed_rows + 1,
            )
    else:
        logger.info("Starting new run. Output file %s does not exist.", output_csv)

    with open(
        input_csv, "r", newline="", encoding="utf-8", errors="replace"
    ) as f_in, open(
        output_csv, "a", newline="", encoding="utf-8", errors="replace"
    ) as f_out:
        reader = list(csv.reader(f_in))
        writer = csv.writer(f_out)

        if not reader:
            logger.warning("Input file %s is empty.", input_csv)
            return

        total = len(reader) - 1
        data_rows = reader[1:]  # skip header

        if processed_rows == 0:
            writer.writerow(["Ticker", "Date", "Headline", "GNW_timestamp_iso"])

        rows_to_process = data_rows[processed_rows:]

        for i, row in enumerate(rows_to_process):
            row_num = processed_rows + i + 1

            try:
                if not row or len(row) < 3:
                    logger.warning("Skipping row %d: Malformed input.", row_num)
                    continue

                feed_date = row[0]
                ticker = row[1]
                headline = ",".join(row[2:]).strip()

                logger.info(
                    "Row %d/%d: Searching GNW for %s - %s",
                    row_num,
                    total,
                    ticker,
                    headline[:30] + ("..." if len(headline) > 30 else ""),
                )

                pr_info = search_gnw_prinfo_for_headline(ticker, headline, feed_date)
                ts_iso = ""

                if pr_info is not None and pr_info.ts_iso:
                    ts_iso = pr_info.ts_iso

                writer.writerow([ticker, feed_date, headline, ts_iso])

            except Exception as e:
                logger.error(
                    "Unhandled error on row %d (ticker=%s, date=%s): %s",
                    row_num,
                    row[1] if len(row) > 1 else "",
                    row[0] if len(row) > 0 else "",
                    e,
                    exc_info=True,
                )
                # best effort: mark the row as error
                try:
                    writer.writerow(
                        [
                            row[1] if len(row) > 1 else "",
                            row[0] if len(row) > 0 else "",
                            ",".join(row[2:]).strip() if len(row) > 2 else "",
                            "ERROR",
                        ]
                    )
                except Exception:
                    pass

            # rate limit so we don't hammer Google/GNW
            time.sleep(4.0)

    logger.info("Processing complete. Output written to %s", output_csv)
