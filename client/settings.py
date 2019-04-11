import os
from dotenv import load_dotenv

load_dotenv(verbose=True)

CATALOG_SERVICE_IPS = os.getenv("CATALOG_SERVICE_IPS") if os.getenv("CATALOG_SERVICE_IPS") else "localhost:50051"
FAVORITES_SERVICE_IPS = os.getenv("FAVORITES_SERVICE_IPS") if os.getenv("FAVORITES_SERVICE_IPS") else "localhost:50052"