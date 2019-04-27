const grpc = require('grpc');
const protos = require('./protos');
const config = require('./config');
const { Etcd3 } = require('etcd3');
const { EtcdClient } = require('./EtcdClient');

const {RecommendationRepository} = require('./RecommendationRepository');
const {getRecommendationCollection} = require('./db');
const {RecommendationService} = require('./RecommendationService');
const healthService = require('./HealthService');
const client = new Etcd3({hosts:`${config.etcd.host}:${config.etcd.port}`});
const etcdClient = new EtcdClient(client); 

(async () => {
    const collection = await getRecommendationCollection();
    const repository = new RecommendationRepository(collection);
    const recommendationService = new RecommendationService(repository);
    const server = new grpc.Server();
    server.addService(protos.services.users.UsersService, recommendationService);
    server.addService(protos.services.healthcheck.HealthCheckService, healthService);
    server.bind(`0.0.0.0:${config.port}`, grpc.ServerCredentials.createInsecure());
    server.start();
    console.log(`Serving at ${config.host}:${config.port}`);
    await etcdClient.register();
})();