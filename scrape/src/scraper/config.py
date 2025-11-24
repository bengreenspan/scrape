import os
from dotenv import load_dotenv

load_dotenv()

USER_AGENT = os.getenv(
    "USER_AGENT",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
)
PROXY = os.getenv("PROXY", "")
REQUEST_TIMEOUT = int(os.getenv("REQUEST_TIMEOUT", "15"))
