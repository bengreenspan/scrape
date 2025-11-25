import logging
import csv
import re
import time
import os
from urllib.parse import quote_plus, urlparse, parse_qs
from bs4 import BeautifulSoup
# NOTE: Ensure you have a config.py file with GOOGLE_API_KEY, GOOGLE_SEARCH_CX, and REQUEST_TIMEOUT
from . import client, config 
from datetime import datetime, timedelta, timezone
import requests
from requests.exceptions import RequestException

# Logging setup
logging.basicConfig(level=logging.INFO, format='[%(levelname)s] %(message)s')
logger = logging.getLogger(__name__)

# Define the date tolerance (2 days)
DATE_TOLERANCE = timedelta(days=2)

class PRInfo:
    def __init__(self, url="", ts_raw="", ts_iso=""):
        self.url = url
        self.ts_raw = ts_raw
        self.ts_iso = ts_iso

def normalize_headline(headline):
    """Normalize curly quotes to straight quotes."""
    return headline.replace('“', '"').replace('”', '"').replace("‘", "'").replace("’", "'")

def _is_gnw_release_url(url):
    """Checks if URL is a valid GNW news-release."""
    if not url: return False
    return "globenewswire.com" in url and "news-release" in url

# --- Search Strategies (No changes to the logic here) ---

def _search_web_api(headline):
    """
    Searches using Google Custom Search JSON API.
    Requires GOOGLE_API_KEY and GOOGLE_SEARCH_CX in .env.
    """
    if not config.GOOGLE_API_KEY or not config.GOOGLE_SEARCH_CX:
        return None

    try:
        query = f'site:globenewswire.com/news-release "{headline}"'
        
        params = {
            'key': config.GOOGLE_API_KEY,
            'cx': config.GOOGLE_SEARCH_CX,
            'q': query,
            'num': 3
        }

        resp = client.get("https://www.googleapis.com/customsearch/v1", params=params)
        data = resp.json()

        if 'items' in data:
            for item in data['items']:
                link = item.get('link', '')
                if _is_gnw_release_url(link):
                    return link

    except Exception as e:
        logger.warning(f"Google API search failed: {e}")
    
    return None

def _search_brave(headline):
    """Scrapes Brave Search HTML."""
    try:
        query = f'site:globenewswire.com/news-release "{headline}"'
        url = f"https://search.brave.com/search?q={quote_plus(query)}"
        resp = client.get(url)
        soup = BeautifulSoup(resp.text, "lxml")
        
        for a in soup.find_all("a", href=True):
            href = a['href']
            if href.startswith("http") and _is_gnw_release_url(href):
                if "search.brave.com" not in href:
                    return href
    except Exception as e:
        logger.warning(f"Brave search failed: {e}")
    return None

def _search_ddg(headline):
    """Scrapes DuckDuckGo HTML."""
    try:
        url = f"https://duckduckgo.com/html/?q={quote_plus(headline + ' site:globenewswire.com')}"
        resp = client.get(url)
        soup = BeautifulSoup(resp.text, "lxml")
        
        for a in soup.find_all("a", href=True):
            href = a['href']
            if "/l/?uddg=" in href:
                parsed = urlparse(href)
                qs = parse_qs(parsed.query)
                if 'uddg' in qs:
                    href = qs['uddg'][0]
            
            if _is_gnw_release_url(href):
                return href
    except Exception as e:
        logger.warning(f"DDG search failed: {e}")
    return None

def _search_gnw_site(headline):
    """Searches GlobeNewswire internal search."""
    try:
        url = f"https://www.globenewswire.com/en/search?query={quote_plus(headline)}"
        resp = client.get(url)
        soup = BeautifulSoup(resp.text, "lxml")
        
        base_url = "https://www.globenewswire.com"
        for a in soup.find_all("a", href=True):
            href = a['href']
            full_url = href if href.startswith("http") else base_url + href
            
            if _is_gnw_release_url(full_url):
                return full_url
    except Exception as e:
        logger.warning(f"GNW site search failed: {e}")
    return None

def search_gnw_url_for_headline(headline):
    """Orchestrates the search fallback strategy."""
    clean_headline = normalize_headline(headline)
    
    url = _search_web_api(clean_headline)
    if url: return url
    
    url = _search_brave(clean_headline)
    if url: return url
    
    url = _search_ddg(clean_headline)
    if url: return url
    
    url = _search_gnw_site(clean_headline)
    if url: return url
    
    return None

# --- Extraction Logic (Updated for Date Check) ---

def extract_timestamp_from_gnw(gnw_url, feed_date_str):
    """
    Scrapes the GNW page for the official timestamp and checks it against 
    the input date (feed_date_str) with a tolerance of DATE_TOLERANCE (2 days).
    Returns PRInfo object with timestamps, or None if the date check fails.
    """
    # 1. Prepare for Date Comparison
    try:
        # Input date is assumed to be in 'YYYY-MM-DD' format
        input_date = datetime.strptime(feed_date_str.split(' ')[0].strip(), '%Y-%m-%d').date()
    except ValueError:
        logger.error(f"Input date format error: '{feed_date_str}'. Expected 'YYYY-MM-DD'. Cannot perform date check.")
        input_date = None # Cannot perform check

    pr_info = PRInfo(url=gnw_url)
    
    try:
        logger.info("-> Extracting timestamp from GNW page...")
        
        # 2. Fetch the GNW page content (using more stable requests and timeout)
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'}
        # Use the REQUEST_TIMEOUT from your config.py
        response = requests.get(gnw_url, headers=headers, timeout=config.REQUEST_TIMEOUT) 
        response.raise_for_status() # Raise exception for bad status codes
        
        soup = BeautifulSoup(response.content, 'lxml')
        
        # 3. Extract the timestamp (GNW uses time tag with class 'news-release-date')
        time_tag = soup.find('time', {'class': 'news-release-date'})
        if not time_tag:
            logger.warning("-> Could not find the official timestamp on GNW page.")
            return pr_info # Return with no timestamps, will be written as blank
        
        ts_raw = time_tag.text.strip()
        pr_info.ts_raw = ts_raw
        
        # 4. Parse and Standardize GNW Date
        # GNW timestamp is typically 'Month DD, YYYY HH:MM ET'
        try:
            # We split by 'ET' and use a common datetime format for parsing
            gnw_datetime = datetime.strptime(ts_raw.split('ET')[0].strip(), '%B %d, %Y %H:%M')
            gnw_date = gnw_datetime.date()
            # ISO format with ' ET' appended for consistent output
            pr_info.ts_iso = gnw_datetime.strftime("%Y-%m-%d %H:%M:%S ET")
        except ValueError:
            logger.warning(f"Failed to parse GNW timestamp: '{ts_raw}'. Skipping date check.")
            return pr_info # Return with raw TS, but no ISO or date check
        
        # 5. Perform Date Tolerance Check
        if input_date:
            date_difference = abs(input_date - gnw_date)
            
            if date_difference <= DATE_TOLERANCE:
                logger.info(f"-> Date check SUCCESS: Input date {input_date} is within {DATE_TOLERANCE.days} days of GNW date {gnw_date}.")
                return pr_info
            else:
                logger.warning(f"-> Date check FAILED: Difference is {date_difference.days} days. Discarding match.")
                return None # Signal failure to the caller
        
        # If no input_date (due to input format error), return the PR info found
        return pr_info 

    except RequestException as e:
        logger.error(f"Error fetching GNW URL {gnw_url} (Timeout/Request Error): {e}")
        return None
    except Exception as e:
        logger.error(f"An unexpected error occurred during GNW extraction: {e}")
        return None


# --- Main Processing (Updated for Resumption and Date Check Call) ---

def process_file(input_csv, output_csv):
    """
    Reads input, processes rows, and writes output with minimal fields.
    Implements resumption logic and calls the date-checked extraction.
    """
    
    # 1. Determine processed rows from existing output file (Resumption Logic)
    processed_rows = 0
    if os.path.exists(output_csv):
        with open(output_csv, 'r', newline='', encoding='utf-8') as f_out_check:
            reader_check = csv.reader(f_out_check)
            # Count all rows, subtracting 1 for the header
            processed_rows = sum(1 for row in reader_check) - 1
            processed_rows = max(0, processed_rows) 
            logger.info(f"Found {processed_rows} previously processed rows in {output_csv}. Resuming from row {processed_rows + 1}.")
    else:
        logger.info(f"Starting new run. Output file {output_csv} does not exist.")

    # 2. Open input file (read) and output file (append mode)
    with open(input_csv, 'r', newline='', encoding='utf-8') as f_in, \
         open(output_csv, 'a', newline='', encoding='utf-8') as f_out:
        
        reader = csv.reader(f_in)
        writer = csv.writer(f_out)
        
        # Read all rows into a list to easily count and skip
        rows = list(reader)
        
        if not rows:
            logger.warning("Input file is empty.")
            return
            
        total = len(rows) - 1 # Total data rows
        
        # Handle Header Row Logic
        data_rows = rows[1:] # Skip the header
        
        # Only write header if the file is new
        if processed_rows == 0:
            writer.writerow(["Ticker", "Date", "Headline", "GNW_timestamp_iso"])
            
        # Skip previously processed rows
        rows_to_process = data_rows[processed_rows:]
        
        for i, row in enumerate(rows_to_process):
            # i is the index in the 'rows_to_process' list, 
            # row_num is the absolute row number in the original input file
            row_num = processed_rows + i + 1 
            
            if not row or len(row) < 3:
                logger.warning(f"Skipping row {row_num}: Malformed input.")
                continue
                
            ticker = row[0]
            feed_date = row[1]
            headline = ",".join(row[2:]).strip()
            
            logger.info(f"Row {row_num}/{total}: Searching GNW for {ticker} - {headline[:30]}...")
            
            gnw_url = search_gnw_url_for_headline(headline)
            ts_iso = "" 
            
            if gnw_url:
                logger.info(f"-> Found URL: {gnw_url}")
                
                # NEW CALL: Pass the gnw_url AND the input date string (feed_date)
                pr_data = extract_timestamp_from_gnw(gnw_url, feed_date) 
                
                if pr_data is None:
                    # Date check failed (difference > 2 days)
                    gnw_url = None 
                    logger.warning("-> Match discarded due to date difference exceeding 2 days.")
                elif pr_data.ts_iso:
                    # Date check passed or couldn't be performed, but we got a timestamp
                    ts_iso = pr_data.ts_iso
                
            else:
                logger.info("-> No URL found.")
            
            # 3. MODIFIED OUTPUT ROW: Only writing the four desired fields
            writer.writerow([ticker, feed_date, headline, ts_iso])
            
            # Rate limit delay
            time.sleep(1.0)
            
    logger.info(f"Processing complete. Output written to {output_csv}")