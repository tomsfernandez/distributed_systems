const grpc = require('grpc');
const db = require('./db');
const protobuf = require('./protobuf');
const services = require('./services');

(async () => {
    try {
        await db.init();
    } catch (e) {
        console.error("Error initializing database", e);
        process.exit(1);
    }
    const server = new grpc.Server();
    server.addService(protobuf.favorites.grpc.FavoritesService, services.favorites);
    server.addService(protobuf.healthcheck.grpc.HealthCheckService, services.healthcheck);
    server.bind(`0.0.0.0:${process.env.GRPC_PORT}`, grpc.ServerCredentials.createInsecure());
    server.start();
    console.info(`Serving at port ${process.env.GRPC_PORT}`);
})();