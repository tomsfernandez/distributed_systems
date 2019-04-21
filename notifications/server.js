const grpc = require('grpc');
const protos = require('./protos');
const config = require('./config');
const { Etcd3 } = require('etcd3');
const { EtcdClient } = require('./EtcdClient');
const { RegistryBuilder } = require('./UserServiceRegistry');
const { UsersServiceClient } = require('./UsersServiceClient');
const { NotificationsService } = require('./NotificationsService');

const healthService = require('./HealthService');
const client = new Etcd3({hosts:`${config.etcd.host}:${config.etcd.port}`});
const etcdClient = new EtcdClient(client);

(async () => {
    const userRegistry = await RegistryBuilder.build("/users/", client);
    const userServiceClient = new UsersServiceClient(userRegistry);
    const sendEmail = (name, email, content) => {
        console.log(`Sending email to ${name},${email},${content}`)
    };
    const notificationsService = new NotificationsService(sendEmail, userServiceClient);

    const server = new grpc.Server();
    server.addService(protos.services.notifications.NotificationsService, notificationsService);
    server.addService(protos.services.healthcheck.HealthCheckService, healthService);
    server.bind(`0.0.0.0:${config.port}`, grpc.ServerCredentials.createInsecure());
    server.start();
    console.log(`Serving at ${config.host}:${config.port}`);
    await etcdClient.register();
})();