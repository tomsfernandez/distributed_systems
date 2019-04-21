import os
from dotenv import load_dotenv

load_dotenv(verbose=True)

MONGO_HOST = os.getenv("MONGO_HOST") if os.getenv("MONGO_HOST") else "192.168.99.100"
MONGO_PORT = int(os.getenv("MONGO_PORT")) if os.getenv("MONGO_PORT") else 27017
MONGO_DB = os.getenv("MONGO_DB") if os.getenv("MONGO_DB") else "store"
PORT = os.getenv("PORT") if os.getenv("PORT") else "50051"
HOST = os.getenv("HOST") if os.getenv("HOST") else "172.28.1.1"
ETCD_HOST = os.getenv("ETCD_HOST") if os.getenv("ETCD_HOST") else "172.28.4.1"
ETCD_PORT = os.getenv("ETCD_PORT") if os.getenv("ETCD_PORT") else "2379"