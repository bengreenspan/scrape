from typing import Optional, Dict
import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

from . import config


def _build_retry() -> Retry:
    return Retry(
        total=3,
        backoff_factor=0.5,
        status_forcelist=(429, 500, 502, 503, 504),
        allowed_methods=("HEAD", "GET", "OPTIONS"),
        raise_on_status=False,
    )


def get_session() -> requests.Session:
    s = requests.Session()
    retry = _build_retry()
    adapter = HTTPAdapter(max_retries=retry)
    s.mount("http://", adapter)
    s.mount("https://", adapter)
    headers = {
        "User-Agent": config.USER_AGENT,
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Upgrade-Insecure-Requests": "1",
        "Cache-Control": "no-cache",
    }
    s.headers.update(headers)
    if config.PROXY:
        s.proxies.update({"http": config.PROXY, "https": config.PROXY})
    return s

def get(url: str, params: Optional[Dict] = None) -> requests.Response:
    s = get_session()
    resp = s.get(url, params=params, timeout=config.REQUEST_TIMEOUT)
    resp.raise_for_status()
    return resp
