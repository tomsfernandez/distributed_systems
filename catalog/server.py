# To generate protos: python -m grpc_tools.protoc -I../protos --python_out=. --grpc_python_out=. ../protos/catalog.proto

from generated.catalog_pb2 import Product, ProductList
from generated.catalog_pb2_grpc import CatalogServicer, add_CatalogServicer_to_server
import grpc
import time
from concurrent import futures
from settings import MONGO_DB, MONGO_PORT, MONGO_HOST, MONGO_COLLECTION, GRPC_PORT
from mongo_helper import getMongoCollection, parseProductToGrpc
from bson.objectid import ObjectId

_ONE_DAY_IN_SECONDS = 60 * 60 * 24


class CatalogService(CatalogServicer):

    def __init__(self, products):
        self.products = products

    def GetProduct(self, request, context):
        product = self.products.find_one({'_id': ObjectId(request.id)})
        result = parseProductToGrpc(product) if product \
            else Product(id="0", title="Empty Product", description="Empty Description")
        return result

    def GetAllProducts(self, request, context):
        result = list(self.products.find())
        result = list(map(lambda x: parseProductToGrpc(x), result))
        return ProductList(products=result)


def build_server(products):
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    add_CatalogServicer_to_server(CatalogService(products), server)
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
