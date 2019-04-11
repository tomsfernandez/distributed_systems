import datetime

from protos.product_pb2 import Product, ProductList
from protos.catalog_pb2_grpc import CatalogServicer, add_CatalogServicer_to_server
from protos.empty_pb2 import Empty
from protos.healthcheck_pb2_grpc import HealthCheckServicer, add_HealthCheckServicer_to_server
import grpc
import time
from concurrent import futures
from settings import MONGO_DB, MONGO_PORT, MONGO_HOST, MONGO_COLLECTION, GRPC_PORT
from mongo_helper import getMongoCollection, parseProductToGrpc, getProductsWithIds
from bson.objectid import ObjectId

_ONE_DAY_IN_SECONDS = 60 * 60 * 24


class CatalogService(CatalogServicer):

    def __init__(self, products):
        self.products = products

    def GetProduct(self, request, context):
        print(f"[{datetime.datetime.now()}] - GetProduct with {request}")
        product = self.products.find_one({'_id': ObjectId(request.id)})
        if product:
            print(f"[{datetime.datetime.now()}] - Product name: {product['title']}")
        else:
            print(f"[{datetime.datetime.now()}] - Product {request.id} not found!")
        result = parseProductToGrpc(product) if product \
            else Product(id="0", title="Empty Product", description="Empty Description")
        return result

    def GetProductBatch(self, request, context):
        print(f"[{datetime.datetime.now()}] - GetProductBatch with {request}")
        object_ids = list(map(lambda x: ObjectId(x), list(request.ids)))
        product_list = getProductsWithIds(self.products, object_ids)
        result = list(map(lambda x: parseProductToGrpc(x), product_list))
        return ProductList(products=result)

    def GetAllProducts(self, request, context):
        print(f"[{datetime.datetime.now()}] - GetAllProducts with {request}")
        result = list(self.products.find())
        result = list(map(lambda x: parseProductToGrpc(x), result))
        return ProductList(products=result)


class HealthCheckService(HealthCheckServicer):

    def Check(self, request, context):
        return Empty()


def build_server(products):
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    add_CatalogServicer_to_server(CatalogService(products), server)
    add_HealthCheckServicer_to_server(HealthCheckService(), server)
    server.add_insecure_port('[::]:50051')
    return server


def block(on_interrupt, delta):
    try:
        while True:
            time.sleep(delta)
    except KeyboardInterrupt:
        on_interrupt()


print(f"Mongo params: {MONGO_HOST}:{MONGO_PORT} with db {MONGO_DB}/{MONGO_COLLECTION}")
db = getMongoCollection()
grpc_server = build_server(db)
grpc_server.start()
print(f"Catalog server started in port {GRPC_PORT}")
block(lambda: grpc_server.stop(0), _ONE_DAY_IN_SECONDS)
