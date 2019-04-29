const grpc = require('grpc');
const db = require('./db');
const protobuf = require('./protobuf');
const protobufImpl = require('./protobuf-impl');
const etcd = require('./etcd');
const config = require('./config');

(async () => {
    try {
        await db.init();
    } catch (e) {
        console.log("Error initializing database", e);
        process.exit(1);
    }

    try {
        await etcd.register();
    } catch (e) {
        console.log("Error registering instance to etcd", e);
        process.exit(1);
    }

    try {
        await protobuf.init();
    } catch (e) {
        console.log("Error initializing protobuf", e);
        process.exit(1);
    }

    const server = new grpc.Server();
    server.addService(protobuf.favorites.grpc.FavoritesService, protobufImpl.favorites);
    server.addService(protobuf.healthcheck.grpc.HealthCheckService, protobufImpl.healthcheck);
    server.bind(`0.0.0.0:${config.port}`, grpc.ServerCredentials.createInsecure());
    server.start();
    console.log(`Serving at ${config.host}:${config.port}`);
})();