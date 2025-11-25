import os
from dotenv import load_dotenv

load_dotenv()

USER_AGENT = os.getenv("USER_AGENT", "Mozilla/5.0 (compatible; EquityBot/1.0)")
PROXY = os.getenv("PROXY")  # None if not set
REQUEST_TIMEOUT = int(os.getenv("REQUEST_TIMEOUT", "15"))

# Google Config
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
GOOGLE_SEARCH_CX = os.getenv("GOOGLE_SEARCH_CX")
