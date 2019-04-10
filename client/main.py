import time

from protos.catalog_pb2_grpc import CatalogStub
from protos.favorites_pb2_grpc import FavoritesStub
from protos.catalog_pb2 import ProductRequest
from protos.favorites_pb2 import UpdateFavoritesRequest, GetFavoritesRequest
from protos.empty_pb2 import Empty
import grpc


def config():
    # CATALOGUE API
    catalog_channel = grpc.insecure_channel('localhost:50051')
    catalog_stub = CatalogStub(catalog_channel)
    get_product(catalog_stub, "5cae3800b3d96b440059327b")
    get_all_products(catalog_stub)

    # FAVORITE API
    user_id = '5cad11867a8d11f4768b8928'
    product_id = '5cad2492a9767716e292995a'
    favorite_channel = grpc.insecure_channel('192.168.99.100:50052')
    favorite_stub = FavoritesStub(favorite_channel)
    get_favorites(favorite_stub, user_id, False)
    update_favorite(favorite_stub, user_id, product_id)


def process_response(call_future):
    result = call_future.result()
    print(result)


def get_product(stub, product_id):
    request = ProductRequest(id=product_id)
    product_future = stub.GetProduct.future(request)
    result = product_future.result()
    print(result)


def get_all_products(stub):
    products_future = stub.GetAllProducts.future(Empty())
    products_future.add_done_callback(process_response)


def get_products_batch(stub):
    products_batch_future = stub.GetAllProducts.future(Empty())
    products_batch_future.add_done_callback(process_response)


def get_favorites(stub, user_id, with_description):
    request = GetFavoritesRequest(user_id=user_id, with_product_description=with_description)
    favorite_future = stub.GetFavorites.future(request)
    favorite_future.add_done_callback(process_response)


def update_favorite(stub, user_id, product_id):
    favorite_future = stub.UpdateFavorites.future(UpdateFavoritesRequest())
    favorite_future.add_done_callback(process_response)


config()
while True:
    time.sleep(100000)