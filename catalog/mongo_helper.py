from protos.product_pb2 import Product
from settings import MONGO_HOST, MONGO_PORT, MONGO_DB
from pymongo import MongoClient


def getMongoCollection():
    client = MongoClient(MONGO_HOST, MONGO_PORT)
    db = client[MONGO_DB]
    return db['products']


def parseProductToGrpc(product):
    product = Product(id=str(product['_id']), title=product['title'], description=product['description'])
    return product


def getProductsWithIds(db, idList):
    return db.find({'_id': {'$in': idList}})
