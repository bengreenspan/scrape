import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry
from . import config

_session = None

def get_session():
    """Creates or returns a singleton session with retry logic."""
    global _session
    if _session is None:
        _session = requests.Session()
        
        # Headers
        _session.headers.update({
            "User-Agent": config.USER_AGENT,
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.5",
        })

        # Proxy
        if config.PROXY:
            _session.proxies = {"http": config.PROXY, "https": config.PROXY}

        # Retry Logic
        retries = Retry(
            total=3,
            backoff_factor=1,
            status_forcelist=[429, 500, 502, 503, 504],
            allowed_methods=["GET"]
        )
        adapter = HTTPAdapter(max_retries=retries)
        _session.mount("https://", adapter)
        _session.mount("http://", adapter)
        
    return _session

def get(url, params=None):
    """Wrapper for session.get with global timeout."""
    session = get_session()
    try:
        response = session.get(url, params=params, timeout=config.REQUEST_TIMEOUT)
        response.raise_for_status()
        return response
    except requests.RequestException as e:
        raise e
