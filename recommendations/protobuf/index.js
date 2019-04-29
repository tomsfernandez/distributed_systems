const grpc = require('grpc');
const etcd = require('../etcd');

const protobuf = {
    favorites: {messages: require('./favorites_pb'), grpc: require('./favorites_grpc_pb')},
    empty: {messages: require('./empty_pb'), grpc: require('./empty_grpc_pb')},
    product: {messages: require('./product_pb'), grpc: require('./product_grpc_pb')},
    catalog: {messages: require('./catalog_pb'), grpc: require('./catalog_grpc_pb')},
    healthcheck: {messages: require('./healthcheck_pb'), grpc: require('./healthcheck_grpc_pb')},
    recommendations: {messages: require('./recommendations_pb'), grpc: require('./recommendations_grpc_pb')},
    notifications: {messages: require('./notifications_pb'), grpc: require('./notifications_grpc_pb')},
    users: {messages: require('./users_pb'), grpc: require('./users_grpc_pb')}
};

async function init() {
     await buildGrpc('catalog', protobuf.catalog.grpc.CatalogClient);
     await buildGrpc('favorites', protobuf.favorites.grpc.FavoritesClient);
     await buildGrpc('recommendations', protobuf.recommendations.grpc.RecommendationsClient);
     await buildGrpc('notifications', protobuf.notifications.grpc.NotificationsClient);
     await buildGrpc('users', protobuf.users.grpc.UsersClient);
}

async function buildGrpc(serviceName, client) {
    const builtGrpc = protobuf[serviceName].grpc;
    const namespace = `/${serviceName}/instances/`;
    const addresses = await etcd.client.namespace(namespace).getAll().keys();
    builtGrpc.clientInstances = {};
    addresses.forEach(address => {
        builtGrpc.clientInstances[address] = new client(address, grpc.credentials.createInsecure());
    });
    const watcher = await etcd.client.watch().prefix(namespace).create();
    watcher.on('connecting', () => console.log(`Watcher for etcd namespace ${namespace} connecting`));
    watcher.on('disconnected', () => console.log(`Watcher for etcd namespace ${namespace} disconnected`));
    watcher.on('connected', () => console.log(`Watcher for etcd namespace ${namespace} reconnected`));
    watcher.on('put', res => {
        const address = res.key.toString().substr(namespace.length);
        console.log(`Adding ${serviceName} service ${address}`);
        builtGrpc.clientInstances[address] = new client(address, grpc.credentials.createInsecure());
    });
    watcher.on('delete', res => {
        const address = res.key.toString().substr(namespace.length);
        console.log(`Removing ${serviceName} service ${address}`);
        delete builtGrpc.clientInstances[address];
    });
}

module.exports = {init, ...protobuf};