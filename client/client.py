from __future__ import print_function

import proto.catalog_pb2 as catalog_pb2
import proto.catalog_pb2_grpc as catalog_pb2_gprc
import proto.favorites_pb2 as favorites_pb2
import proto.favorites_pb2_gprc as favorites_pb2_gprc

import grpc


def config():
    # CATALOGUE API
    catalog_channel = grpc.insecure_channel('localhost:50051')
    catalog_stub = catalog_pb2_gprc.CatalogStub(catalog_channel)
    get_product(catalog_stub, '5cad2492a9767716e292995a')
    # get_all_products(catalog_stub)

    # FAVORITE API
    user_id = '5cad11867a8d11f4768b8928'
    product_id = '5cad2492a9767716e292995a'
    favorite_channel = grpc.insecure_channel('localhost:50052')
    favorite_stub = favorites_pb2_gprc.FavoritesStub(favorite_channel)
    get_favorites(favorite_stub, user_id, False)
    update_favorite(favorite_stub, user_id, product_id)


def process_response(call_future):
    print(call_future.result())


def get_product(stub, product_id):
    product_future = stub.GetProduct.future(catalog_pb2.ProductRequest(id=product_id))
    product_future.add_done_callback(process_response)


def get_all_products(stub):
    products_future = stub.GetAllProducts.future(catalog_pb2.Empty())
    products_future.add_done_callback(process_response)


def get_products_batch(stub):
    products_batch_future = stub.GetAllProudcts.future(catalog_pb2)
    products_batch_future.add_done_callback(process_response)


def get_favorites(stub, user_id, with_description):
    favorite_future = stub.GetFavorites.future(
        favorites_pb2.GetFavoritesRequest(user_id=user_id, with_product_description=with_description))
    favorite_future.add_done_call(process_response)


def update_favorite(stub, user_id, product_id):
    favorite_future = stub.UpdateFavorite.future(favorites_pb2.UpdateFavoritesRequest())
    favorite_future.add_done_call(process_response)


if __name__ == "__main__":
    config()
