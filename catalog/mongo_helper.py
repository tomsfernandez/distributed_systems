from generated.catalog_pb2 import Product
from settings import MONGO_HOST, MONGO_PORT, MONGO_DB, MONGO_COLLECTION
from pymongo import MongoClient


def getMongoCollection():
    client = MongoClient(MONGO_HOST, MONGO_PORT)
    db = client[MONGO_DB]
    return db[MONGO_COLLECTION]


def parseProductToGrpc(product):
    product = Product(id=str(product['_id']), title=product['title'], description=product['description'])
    return product
