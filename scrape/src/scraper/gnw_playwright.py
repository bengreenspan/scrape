import csv
import sys
import re
import time
from dataclasses import dataclass
from typing import Optional
from datetime import datetime
from urllib.parse import quote_plus

from playwright.sync_api import sync_playwright, TimeoutError as PlaywrightTimeoutError

# Your input format is:
#   Ticker,Date,Headline
# with NO header row.

SEARCH_SLEEP = 1.0   # seconds between searches
GNW_SLEEP = 0.5      # seconds after opening GNW page
# For debugging: limit how many rows we process so headful browser runs are manageable
MAX_ROWS_DEBUG = 1


@dataclass
class PRInfo:
    url: str
    ts_raw: str
    ts_iso: str


TS_REGEX = re.compile(
    r"([A-Za-z]+ \d{1,2}, \d{4} \d{1,2}:\d{2}(?::\d{2})? ?(?:AM|PM)? ?ET)"
)


def _extract_timestamp_from_text(text: str) -> PRInfo:
    """
    Given full page text from a GNW article, pull out the timestamp
    like 'November 14, 2025 09:15 ET' and parse to ISO-ish format.
    """
    m = TS_REGEX.search(text)
    if not m:
        return PRInfo(url="", ts_raw="", ts_iso="")

    ts_raw = m.group(1).strip()
    cleaned = ts_raw.replace("ET", "").strip()

    ts_iso = ""
    for fmt in (
        "%B %d, %Y %H:%M",
        "%B %d, %Y %H:%M:%S",
        "%B %d, %Y %I:%M %p",
        "%B %d, %Y %I:%M:%S %p",
    ):
        try:
            dt = datetime.strptime(cleaned, fmt)
            ts_iso = dt.strftime("%Y-%m-%d %H:%M:%S") + " ET"
            break
        except ValueError:
            continue

    return PRInfo(url="", ts_raw=ts_raw, ts_iso=ts_iso)


def _find_gnw_url_for_headline(page, headline: str) -> Optional[str]:
    """Use GlobeNewswire's own search page to find the news-release URL.

    This avoids Bing and its captchas by going directly to:
        https://www.globenewswire.com/en/search?query=<headline>
    and picking the first /en/news-release/... result.
    """
    headline = headline.strip()
    if not headline:
        return None

    search_q = quote_plus(headline)
    search_url = f"https://www.globenewswire.com/en/search?query={search_q}"
    print(f"[DEBUG] GNW Search URL: {search_url}", file=sys.stderr)

    try:
        page.goto(search_url, wait_until="domcontentloaded", timeout=30000)
    except PlaywrightTimeoutError:
        print("[WARN] GNW search timeout", file=sys.stderr)
        return None

    # Give extra time for any client-side rendering and to allow visual inspection
    page.wait_for_timeout(5000)

    # Try to find links to news releases. Prefer relative /en/news-release links.
    links = page.query_selector_all("a[href]")
    for link in links:
        href = (link.get_attribute("href") or "").strip()
        if not href:
            continue

        # Handle relative URLs first
        if href.startswith("/en/news-release"):
            return "https://www.globenewswire.com" + href

        # Or absolute GNW news-release URLs
        if "globenewswire.com" in href and "news-release" in href:
            return href

    time.sleep(SEARCH_SLEEP)
    return None


def _scrape_row(page, ticker: str, date_str: str, headline: str) -> PRInfo:
    """
    For a single row (ticker, date, headline):
      - find the GNW URL via Bing
      - open the GNW page
      - extract timestamp
    """
    gnw_url = _find_gnw_url_for_headline(page, headline)
    if not gnw_url:
        print(f"[WARN] No GNW URL found for headline={headline!r}", file=sys.stderr)
        return PRInfo(url="", ts_raw="", ts_iso="")

    print(f"[INFO] GNW URL -> {gnw_url}", file=sys.stderr)

    try:
        page.goto(gnw_url, wait_until="domcontentloaded", timeout=20000)
    except PlaywrightTimeoutError:
        print(f"[WARN] Timeout loading GNW URL: {gnw_url}", file=sys.stderr)
        return PRInfo(url=gnw_url, ts_raw="", ts_iso="")

    page.wait_for_timeout(1000)
    text = page.inner_text("body")
    pr = _extract_timestamp_from_text(text)
    pr.url = gnw_url
    time.sleep(GNW_SLEEP)
    return pr


def run_scraper(input_csv: str, output_csv: str) -> None:
    """
    Read input_csv (no header) as:
      col0 = Ticker
      col1 = Date (string)
      col2+ = Headline (joined with commas)

    Use Playwright to find GNW URL + timestamp and write output_csv with header:
      Ticker,Date,Headline,GNW_URL,GNW_timestamp_raw,GNW_timestamp_iso
    """

    # Load rows
    with open(input_csv, newline="", encoding="utf-8-sig") as f_in:
        reader = csv.reader(f_in, delimiter=",")
        rows = []
        for i, row in enumerate(reader, start=1):
            if not row or all(not str(x).strip() for x in row):
                continue
            if len(row) < 3:
                print(f"[WARN] Row {i}: not enough columns -> {row!r}", file=sys.stderr)
                continue

            ticker = str(row[0]).strip()
            date_str = str(row[1]).strip()
            headline = ",".join(row[2:]).strip()
            rows.append((ticker, date_str, headline))

    # Use one browser session for all rows
    with sync_playwright() as p:
        # headless=False so you can see what Bing is actually returning (e.g. captchas)
        browser = p.chromium.launch(headless=False)
        context = browser.new_context()
        page = context.new_page()

        with open(output_csv, "w", newline="", encoding="utf-8") as f_out:
            fieldnames = [
                "Ticker",
                "Date",
                "Headline",
                "GNW_URL",
                "GNW_timestamp_raw",
                "GNW_timestamp_iso",
            ]
            writer = csv.DictWriter(f_out, fieldnames=fieldnames)
            writer.writeheader()

            for i, (ticker, date_str, headline) in enumerate(rows, start=1):
                print(
                    f"[INFO] Row {i}: searching GNW for headline={headline!r}",
                    file=sys.stderr,
                )
                pr = _scrape_row(page, ticker, date_str, headline)

                writer.writerow(
                    {
                        "Ticker": ticker,
                        "Date": date_str,
                        "Headline": headline,
                        "GNW_URL": pr.url,
                        "GNW_timestamp_raw": pr.ts_raw,
                        "GNW_timestamp_iso": pr.ts_iso,
                    }
                )

                # In debug mode, stop after a few rows so you can inspect Bing behavior
                if i >= MAX_ROWS_DEBUG:
                    print("[INFO] Reached debug row limit, stopping early.", file=sys.stderr)
                    break

        context.close()
        browser.close()

    print(f"[DONE] Wrote {output_csv}", file=sys.stderr)