const grpc = require('grpc');
const db = require('./db');
const protobuf = require('./protobuf');
const services = require('./services');
const {CatalogService} = require('./services/CatalogService.js');
const {GRPC_PORT, CATALOG_GRPC_HOSTS} = require('./config.js');

(async () => {
    try {
        await db.init();
    } catch (e) {
        console.error("Error initializing database", e);
        process.exit(1);
    }
    const server = new grpc.Server();
    const catalogService = new CatalogService(CATALOG_GRPC_HOSTS, 10 * 1000);
    const getFavorites = services.favorites.getFavorites.bind(null, catalogService);
    const favoritesService = {getFavorites: getFavorites, updateFavorites: services.favorites.updateFavorites};
    server.addService(protobuf.favorites.grpc.FavoritesService, favoritesService);
    server.addService(protobuf.healthcheck.grpc.HealthCheckService, services.healthcheck);
    server.bind(`0.0.0.0:${GRPC_PORT}`, grpc.ServerCredentials.createInsecure());
    server.start();
    console.info(`Serving at port ${GRPC_PORT}`);
})();