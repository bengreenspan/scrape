import csv
import sys
import time
import re
import os
from dataclasses import dataclass
from typing import Optional
from datetime import datetime
from urllib.parse import quote_plus, urlparse, parse_qs, unquote

import requests
from bs4 import BeautifulSoup

from .client import get


# Be polite to search engines + GNW
SEARCH_SLEEP = 2.0   # seconds between search calls
GNW_SLEEP = 1.0      # seconds between GNW calls


@dataclass
class PRInfo:
    url: str
    ts_raw: str
    ts_iso: str


# Matches things like:
#  "November 14, 2025 09:15 ET"
#  "November 14, 2025 9:15 AM ET"
#  "November 14, 2025 09:15:30 ET"
TS_REGEX = re.compile(
    r"([A-Za-z]+ \d{1,2}, \d{4} \d{1,2}:\d{2}(?::\d{2})? ?(?:AM|PM)? ?ET)"
)


def _search_gnw_url_via_bing_api(headline: str) -> Optional[str]:
    api_key = os.getenv("BING_SEARCH_API_KEY", "").strip()
    if not api_key:
        return None

    headline = headline.strip()
    if not headline:
        return None

    query = f'site:globenewswire.com/news-release "{headline}"'
    endpoint = "https://api.bing.microsoft.com/v7.0/search"
    headers = {"Ocp-Apim-Subscription-Key": api_key}
    params = {"q": query, "responseFilter": "Webpages", "count": 5}

    try:
        resp = requests.get(endpoint, headers=headers, params=params, timeout=10)
    except Exception as e:
        print(f"[ERROR] Bing API request failed: {e}", file=sys.stderr)
        return None

    if resp.status_code != 200:
        print(f"[ERROR] Bing API HTTP {resp.status_code}: {resp.text[:200]}", file=sys.stderr)
        return None

    try:
        data = resp.json()
    except ValueError as e:
        print(f"[ERROR] Bing API JSON decode failed: {e}", file=sys.stderr)
        return None

    web_pages = data.get("webPages", {}).get("value", [])
    for item in web_pages:
        url = item.get("url", "")
        if "globenewswire.com" in url and "news-release" in url:
            print(f"[INFO] Bing API GNW URL -> {url}", file=sys.stderr)
            return url

    return None


def search_gnw_url_for_headline(headline: str) -> Optional[str]:
    """Use Brave Search HTML to find the GlobeNewswire URL for a given headline.

    We query Brave with:
        site:globenewswire.com/news-release "headline"

    and return the first matching GNW news-release URL, or None.
    """
    headline = headline.strip()
    # Normalize curly quotes to straight quotes for better search matching
    headline = (
        headline.replace("\u201C", '"')
                .replace("\u201D", '"')
                .replace("\u2018", "'")
                .replace("\u2019", "'")
    )
    if not headline:
        return None

    api_url = _search_gnw_url_via_bing_api(headline)
    if api_url:
        return api_url

    # Start with a small set of targeted queries to reduce the chance of
    # hitting Brave rate limits (429). We can expand later if needed.
    queries = [
        f'site:globenewswire.com/news-release "{headline}"',
        f'site:globenewswire.com "{headline}"',
    ]

    for query in queries:
        url = "https://search.brave.com/search?q=" + quote_plus(query)
        print(f"[DEBUG] Brave URL: {url}", file=sys.stderr)

        try:
            resp = get(url)
        except Exception as e:
            print(f"[ERROR] Brave request failed: {e}", file=sys.stderr)
            resp = None

        soup = BeautifulSoup(resp.text, "lxml") if resp is not None else None
        if soup is None:
            continue

        found = None
        for a in soup.find_all("a", href=True):
            href = a["href"]
            if not href:
                continue

            # Skip Brave internal links like "/ask" or navigation anchors.
            if href.startswith("/"):
                continue

            # Only accept absolute GNW news-release URLs.
            if href.startswith("http") and "globenewswire.com" in href and "news-release" in href:
                found = href
                break

        if found:
            return found

    # Fallback: DuckDuckGo HTML endpoint
    ddg_query = quote_plus(query)
    ddg_url = f"https://duckduckgo.com/html/?q={ddg_query}"
    print(f"[DEBUG] DDG URL: {ddg_url}", file=sys.stderr)
    try:
        ddg_resp = get(ddg_url)
        ddg_soup = BeautifulSoup(ddg_resp.text, "lxml")
        for a in ddg_soup.find_all("a", href=True):
            href = a["href"]
            # Direct GNW link
            if "globenewswire.com" in href and "news-release" in href:
                return href
            # DuckDuckGo redirect like /l/?kh=-1&uddg=<encoded>
            if href.startswith("/l/") or href.startswith("/r/"):
                try:
                    parsed = urlparse(href)
                    params = parse_qs(parsed.query)
                    target_list = params.get("uddg") or params.get("u") or []
                    if target_list:
                        real = unquote(unquote(target_list[0]))
                        if "globenewswire.com" in real and "news-release" in real:
                            return real
                except Exception:
                    pass
    except Exception as e:
        print(f"[ERROR] DDG request failed: {e}", file=sys.stderr)

    # Fallback: GlobeNewswire site search
    try:
        gnw_search_q = quote_plus(headline)
        gnw_search_url = f"https://www.globenewswire.com/en/search?query={gnw_search_q}"
        print(f"[DEBUG] GNW Search URL: {gnw_search_url}", file=sys.stderr)
        gnw_resp = get(gnw_search_url)
        gnw_soup = BeautifulSoup(gnw_resp.text, "lxml")
        for a in gnw_soup.find_all("a", href=True):
            href = a["href"]
            if "globenewswire.com" in href and "news-release" in href:
                return href
            # Some links may be relative
            if href.startswith("/en/news-release"):
                return "https://www.globenewswire.com" + href
    except Exception as e:
        print(f"[ERROR] GNW site search failed: {e}", file=sys.stderr)

    return None


def extract_timestamp_from_gnw(url: str) -> PRInfo:
    """
    Given a GNW news-release URL, download the page, extract the timestamp
    like 'November 14, 2025 09:15 ET', and return raw + ISO-like value.
    """
    if not url:
        return PRInfo(url="", ts_raw="", ts_iso="")

    try:
        resp = get(url)
    except Exception as e:
        print(f"[ERROR] GNW request failed for {url}: {e}", file=sys.stderr)
        return PRInfo(url=url, ts_raw="", ts_iso="")

    if resp.status_code != 200:
        print(f"[WARN] GNW HTTP {resp.status_code} for {url}", file=sys.stderr)
        return PRInfo(url=url, ts_raw="", ts_iso="")

    soup = BeautifulSoup(resp.text, "lxml")
    text = soup.get_text(separator="\n")

    m = TS_REGEX.search(text)
    if not m:
        print(f"[WARN] No timestamp pattern found on {url}", file=sys.stderr)
        return PRInfo(url=url, ts_raw="", ts_iso="")

    ts_raw = m.group(1).strip()

    # Strip 'ET' to parse
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

    return PRInfo(url=url, ts_raw=ts_raw, ts_iso=ts_iso)


def process_file(input_csv: str, output_csv: str) -> None:
    """
    Expect input CSV with NO header, comma-separated, where:
      col 0 = Ticker
      col 1 = Date/Time (your feed timestamp)
      col 2+ = Headline (may contain commas, so we join the rest)
    Write output CSV with a header row and added GNW columns.
    """

    with open(input_csv, newline="", encoding="utf-8-sig") as f_in, \
         open(output_csv, "w", newline="", encoding="utf-8") as f_out:

        reader = csv.reader(f_in, delimiter=",")
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

        for i, row in enumerate(reader, start=1):
            # Skip completely empty lines
            if not row or all((not str(x).strip() for x in row)):
                continue

            # Ensure we have at least ticker, date/time, and headline start
            if len(row) < 3:
                print(f"[WARN] Row {i}: not enough columns -> {row!r}", file=sys.stderr)
                continue

            ticker = str(row[0]).strip()
            date_str = str(row[1]).strip()
            # Join the rest as headline (to handle commas in the text)
            headline = ",".join(row[2:]).strip()

            print(f"[INFO] Row {i}: searching GNW for headline={headline!r}", file=sys.stderr)

            url = search_gnw_url_for_headline(headline)
            time.sleep(SEARCH_SLEEP)

            out_row = {
                "Ticker": ticker,
                "Date": date_str,
                "Headline": headline,
                "GNW_URL": "",
                "GNW_timestamp_raw": "",
                "GNW_timestamp_iso": "",
            }

            if not url:
                print(f"[WARN] Row {i}: no GNW URL found", file=sys.stderr)
            else:
                print(f"[INFO] Row {i}: GNW URL -> {url}", file=sys.stderr)
                pr = extract_timestamp_from_gnw(url)
                time.sleep(GNW_SLEEP)
                out_row["GNW_URL"] = pr.url
                out_row["GNW_timestamp_raw"] = pr.ts_raw
                out_row["GNW_timestamp_iso"] = pr.ts_iso

            writer.writerow(out_row)