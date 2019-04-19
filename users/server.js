const grpc = require('grpc');
const protos = require('./protos');
const config = require('./config');
const { Etcd3 } = require('etcd3');
const { EtcdClient } = require('./EtcdClient');

const {UserRepository} = require('./UserRepository');
const {getUserCollection} = require('./startup');
const {UsersService} = require('./UsersService');
const healthService = require('./HealthService');
const client = new Etcd3({hosts:`${config.etcd.host}:${config.etcd.port}`});
const etcdClient = new EtcdClient(client);

(async () => {
    const collection = await getUserCollection();
    const repository = new UserRepository(collection);
    const userService = new UsersService(repository);
    const server = new grpc.Server();
    server.addService(protos.services.users.UsersService, userService);
    server.addService(protos.services.healthcheck.HealthCheckService, healthService);
    server.bind(`0.0.0.0:${config.port}`, grpc.ServerCredentials.createInsecure());
    server.start();
    console.log(`Serving at port ${config.port}`);
    await etcdClient.register();
})();