import threading
import time

from empty_pb2 import Empty


class HealthCheck:

    def __init__(self, client):
        self.client = client
        self.isHealthy = False

    def check(self):
        try:
            self.client.Check(Empty())
            self.isHealthy = True
        except:
            self.isHealthy = False


def set_interval(func, interval):
    while True:
        time.sleep(interval)
        func()


def start_worker(func):
    thread = threading.Thread(target=func)
    thread.start()
    return thread


class HealthChecker:

    def __init__(self, checkInterval, onHealthy):
        self.toCheck = []
        self.interval = checkInterval
        self.onHealthy = onHealthy
        self.worker = start_worker(set_interval(lambda: self.checkHealth(), 10))

    def add(self, client):
        self.toCheck.append(client)

    def checkHealth(self):
        print("[Health Check] - Checking Health!")
        checks = map(lambda x: HealthCheck(x).check(), self.toCheck)
        healthy = list(filter(lambda x: x.isHealthy, checks))
        unhealthy = list(filter(lambda x: not x.isHealthy, checks))
        self.toCheck = unhealthy
        self.onHealthy(healthy)
