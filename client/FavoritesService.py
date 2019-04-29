import grpc

from HealthCheck import HealthChecker
from favorites_pb2 import GetFavoritesRequest
from favorites_pb2_grpc import FavoritesStub
from healthcheck_pb2_grpc import HealthCheckStub


def makeOneClient(ip, service):
    channel = grpc.insecure_channel('localhost:50052')
    service_sub = service(channel)
    health_stub = HealthCheckStub(channel)
    return GrpcClient(service_sub, health_stub, ip)


def makeClients(ipList, service):
    return list(map(lambda x: makeOneClient(x, service), ipList))


class GrpcClient:

    def __init__(self, client, health, ip):
        self.client = client
        self.health = health
        self.ip = ip


class FavoritesService:

    def __init__(self, ipList):
        self.ipList = ipList
        self.clients = makeClients(ipList, lambda x: FavoritesStub(x))
        self.blackList = []
        self.healthChecker = HealthChecker(10000, lambda x: self.on_health(x))

    async def get_favorites(self, userId, fullProduct):
        aClient = self.clients.pop() if len(self.clients) > 0 else None
        while aClient is not None:
            try:
                request = GetFavoritesRequest(user_id=userId, full_product=fullProduct)
                favorites = aClient.client.GetFavorites.future(request).result()
                self.clients.append(aClient)
                return favorites
            except BaseException as e:
                print(f"[CatalogService] - Adding {aClient.ip} to blackList for health check")
                self.blackList.append(aClient)
                aClient = self.clients.pop() if len(self.clients) > 0 else None

#        if len(self.clients) == 0 and aClient is None:
#            raise Exception(f"[CatalogService] - All {len(self.blackList)} clients are down!")

    def on_health(self, healthy_list):
        self.clients = self.clients + healthy_list
