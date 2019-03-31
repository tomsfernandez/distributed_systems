import os
from dotenv import load_dotenv

load_dotenv(verbose=True)

MONGO_HOST = os.getenv("MONGO_HOST") if os.getenv("MONGO_HOST") else "192.168.99.100"
MONGO_PORT = int(os.getenv("MONGO_PORT")) if os.getenv("MONGO_PORT") else 27017
MONGO_DB = os.getenv("MONGO_DB") if os.getenv("MONGO_DB") else "Catalog"
MONGO_COLLECTION = os.getenv("MONGO_COLLECTION") if os.getenv("MONGO_COLLECTION") else "Products"
GRPC_PORT = os.getenv("GRPC_PORT") if os.getenv("GRPC_PORT") else "50051"