const grpc = require('grpc');
const etcd = require('../etcd');

const protobuf = {
    favorites: {messages: require('./favorites_pb'), grpc: require('./favorites_grpc_pb')},
    empty: {messages: require('./empty_pb'), grpc: require('./empty_grpc_pb')},
    product: {messages: require('./product_pb'), grpc: require('./product_grpc_pb')},
    catalog: {messages: require('./catalog_pb')},
    healthcheck: {messages: require('./healthcheck_pb'), grpc: require('./healthcheck_grpc_pb')}
};

async function init() {
     protobuf.catalog.grpc = await catalogGrpc();
}

async function catalogGrpc() {
    const catalogNamespace = '/catalog/instances/';
    const catalogGrpc = require('./catalog_grpc_pb');
    const catalogAddresses = await etcd.client.namespace(catalogNamespace).getAll().keys();
    catalogGrpc.clientInstances = {};
    catalogAddresses.forEach(address => {
        catalogGrpc.clientInstances[address] = new catalogGrpc.CatalogClient(address, grpc.credentials.createInsecure());
    });
    const watcher = await etcd.client.watch().prefix(catalogNamespace).create();
    watcher.on('connecting', () => console.log(`Watcher for etcd namespace ${catalogNamespace} connecting`));
    watcher.on('disconnected', () => console.log(`Watcher for etcd namespace ${catalogNamespace} disconnected`));
    watcher.on('connected', () => console.log(`Watcher for etcd namespace ${catalogNamespace} reconnected`));
    watcher.on('put', res => {
        const address = res.key.toString().substr(catalogNamespace.length);
        console.log(`Adding catalog service ${address}`);
        protobuf.catalog.grpc.clientInstances[address] = new catalogGrpc.CatalogClient(address, grpc.credentials.createInsecure());
    });
    watcher.on('delete', res => {
        const address = res.key.toString().substr(catalogNamespace.length);
        console.log(`Removing catalog service ${address}`);
        delete protobuf.catalog.grpc.clientInstances[address];
    });
    return catalogGrpc;
}

module.exports = {init, ...protobuf};