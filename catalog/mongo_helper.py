from product_pb2 import Product
from settings import MONGO_HOST, MONGO_PORT, MONGO_DB
from pymongo import MongoClient


def getMongoCollection():
    client = MongoClient(MONGO_HOST, MONGO_PORT)
    db = client[MONGO_DB]
    return db['products']


def parseProductToGrpc(product):
    product = Product(id=str(product['_id']), title=product['title'], description=product['description'], tags=product['tags'], rating=product['rating'])
    return product


def getProductsWithIds(db, idList):
    return db.find({'_id': {'$in': idList}})

def filterProducts(db, tags, exclude_ids, limit):
    return db.find({'_id': {'$nin': exclude_ids}, 'tags': {'$in': tags}}).limit(limit)
