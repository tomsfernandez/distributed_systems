import time

from protos.catalog_pb2_grpc import CatalogStub
from protos.favorites_pb2_grpc import FavoritesStub
from protos.catalog_pb2 import ProductRequest, BatchProductRequest
from protos.favorites_pb2 import UpdateFavoritesRequest, GetFavoritesRequest
from protos.empty_pb2 import Empty
import grpc


def config():
    # CATALOGUE API
    catalog_channel = grpc.insecure_channel('localhost:50051')
    batch_list = ['5cae9f5cce166a184066930a', '5cae9f5cce166a25c2669358']
    catalog_stub = CatalogStub(catalog_channel)
    get_product(catalog_stub, '5caf457c075aee055c36ff74')
    get_all_products(catalog_stub)
    # get_products_batch(catalog_stub, batch_list)

    # FAVORITE API
    user_id = '5cae9f5cce166ac3876692f5'
    product_list = ['5cae9f5cce166a184066930a']
    favorite_channel = grpc.insecure_channel('localhost:50052')
    favorite_stub = FavoritesStub(favorite_channel)
    get_favorites(favorite_stub, user_id, True)
    # update_favorite(favorite_stub, user_id, product_list, [])


def process_response(call_future):
    print(call_future.result())


def get_product(stub, product_id):
    product_future = stub.GetProduct.future(ProductRequest(id=product_id))
    product_future.add_done_callback(process_response)


def get_all_products(stub):
    products_future = stub.GetAllProducts.future(Empty())
    products_future.add_done_callback(process_response)


def get_products_batch(stub, batch_list):
    products_batch_future = stub.GetProductBatch.future(BatchProductRequest(ids=batch_list))
    products_batch_future.add_done_callback(process_response)


def get_favorites(stub, user_id, with_description):
    request = GetFavoritesRequest(user_id=user_id, with_product_description=with_description)
    favorite_future = stub.GetFavorites.future(request)
    favorite_future.add_done_callback(process_response)


def update_favorite(stub, user_id, add_list, remove_list):
    request = UpdateFavoritesRequest(user_id=user_id, add_product_ids=add_list, remove_product_ids=remove_list)
    favorite_future = stub.UpdateFavorites.future(request)
    favorite_future.add_done_callback(process_response)


config()
while True:
    time.sleep(100000)