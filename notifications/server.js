const grpc = require('grpc');
const protos = require('./protos');
const config = require('./config');
const { UsersServiceClient } = require('./UsersServiceClient');
const { NotificationsService } = require('./NotificationsService');

const healthService = require('./HealthService');

(async () => {
    const userEtcdClient =  new protos.services.users.UsersClient(config.user_endpoint, grpc.credentials.createInsecure());
    const userServiceClient = new UsersServiceClient(userEtcdClient,config.user_endpoint);
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
})();