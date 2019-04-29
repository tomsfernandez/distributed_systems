import datetime
import time
from concurrent import futures

import etcd3
import grpc
from bson.objectid import ObjectId

from catalog_pb2_grpc import CatalogServicer, add_CatalogServicer_to_server
from empty_pb2 import Empty
from healthcheck_pb2_grpc import HealthCheckServicer, add_HealthCheckServicer_to_server
from mongo_helper import getMongoCollection, parseProductToGrpc, getProductsWithIds, filterProducts
from product_pb2 import Product, ProductList
from settings import HOST, PORT, ETCD_HOST, ETCD_PORT

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

    def FilterProducts(self, request, context):
        print(f"[{datetime.datetime.now()}] - FilterProducts with {request}")
        exclude_ids = list(map(lambda x: ObjectId(x), list(request.exclude_ids)))
        product_list = filterProducts(self.products, list(request.tags), exclude_ids, request.limit)
        result = list(map(lambda x: parseProductToGrpc(x), product_list))
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


print(f"Catalog server started in {HOST}:{PORT}")
db = getMongoCollection()
grpc_server = build_server(db)
grpc_server.start()

etcd = etcd3.client(host=ETCD_HOST, port=ETCD_PORT)
lease = etcd.lease(10)
etcd.put(f"/catalog/instances/{HOST}:{PORT}", "", lease)
print(f"Catalog server registered to etcd")
while True:
    lease.refresh()
    time.sleep(2)
