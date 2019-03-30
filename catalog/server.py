# To generate protos: python -m grpc_tools.protoc -I../protos --python_out=. --grpc_python_out=. ../protos/catalog.proto

from catalog_pb2 import Article
from catalog_pb2_grpc import CatalogServicer, add_CatalogServicer_to_server
import grpc
import time
from concurrent import futures

_ONE_DAY_IN_SECONDS = 60 * 60 * 24


class CatalogService(CatalogServicer):

    def GetArticle(self, request, context):
        return Article(id=request.id, title="Empty Article", description="Empty Description")


def build_server():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    add_CatalogServicer_to_server(CatalogService(), server)
    server.add_insecure_port('[::]:50051')
    return server


def block(on_interrupt, delta):
    try:
        while True:
            time.sleep(delta)
    except KeyboardInterrupt:
        on_interrupt()


grpc_server = build_server()
grpc_server.start()
print("Catalog server started!")
block(lambda: grpc_server.stop(0), _ONE_DAY_IN_SECONDS)
