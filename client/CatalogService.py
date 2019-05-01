import GrpcRequestError
from catalog_pb2 import BatchProductRequest


class CatalogService:

    def __init__(self, serviceIPs, healthCheckInterval):
        if serviceIPs.length == 0:
            raise Exception("[CatalogService] - Cant make a CatalogService with no IPs!")
        self.serviceIPs = serviceIPs
        self.healthInterval = healthCheckInterval
        self.blackList = []
        self.clients = []  # generate clients

    async def get_product_batch(self, data):
        aClient = self.clients.pop() if len(self.clients) > 0 else None
        while aClient is not None:
            try:
                request = BatchProductRequest(ids=data)
                products = await aClient.get_product_batch(request)
                self.clients.append(products)
                return products
            except GrpcRequestError:
                print(f"[CatalogService] - Adding {aClient.ip} to blackList for health check")
                self.blackList.append(aClient)
                aClient = self.clients.pop()

        if len(self.clients) == 0 and aClient is None:
            raise Exception(f"[CatalogService] - All {len(self.blackList)} clients are down!")

    async def check_blacklist_health(self):
        healthChecks = await self.make_health_checks()
        self.blackList = map(lambda x: x.client, filter(lambda x: not x.health, healthChecks))
        positiveChecks = map(lambda x: x.client, filter(lambda x: x.health, healthChecks))
        self.clients.append(positiveChecks)
        blackListIps = map(lambda x: x.ip, self.blackList)
        print(f"[Health Checks] - New blacklist: [{blackListIps}]")
        positiveChecksIds = map(lambda x: x.ip, positiveChecks)
        print(f"[Health Checks] - [{positiveChecksIds}] were removed from blacklist")

    async def make_health_checks(self):
        return map(lambda x: await self.health_check(x), self.blackList)

    async def health_check(self, client):
        try:
            await client.checkHealth();
            return {client: client, 'health': True}
        except GrpcRequestError:
            return {client: client, 'health': False}