const {services, messages} = require('./protos');
const grpc = require('grpc');

class UserServiceRegistry{

    constructor(namespace, etcdClient, endpoints, watcher) {
        this.namespace = namespace;
        this.etcdClient = etcdClient;
        this.endpoints = endpoints;
        this.watcher = watcher;
    }
}

class RegistryBuilder{

    static async build(namespace, etcdClient){
        const endpoints = await this.buildClients(namespace, etcdClient);
        const watcher = await this.buildWatcher(namespace,etcdClient, endpoints);
        return new UserServiceRegistry(namespace, etcdClient, endpoints, watcher);
    }

    static async buildClients(namespace, etcdClient){
        const userEndpoints = await etcdClient.namespace(namespace).getAll().keys();
        const endpoints = {};
        userEndpoints.forEach(address => {
            endpoints[address] = new services.users.UsersClient(address, grpc.credentials.createInsecure());
        });
        return endpoints;
    }

    static async buildWatcher(namespace, etcdClient, endpoints){
        const watcher = await etcdClient.watch().prefix(namespace).create();
        watcher.on('connecting', () => console.log(`Watcher for etcd namespace ${namespace} connecting`));
        watcher.on('disconnected', () => console.log(`Watcher for etcd namespace ${namespace} disconnected`));
        watcher.on('connected', () => console.log(`Watcher for etcd namespace ${namespace} reconnected`));
        watcher.on('put', res => {
            const address = res.key.toString().substr(namespace.length);
            console.log(`Adding user enpoint: ${address}`);
            endpoints[address] = new services.users.UsersClient(address, grpc.credentials.createInsecure());
        });
        watcher.on('delete', res => {
            const address = res.key.toString().substr(namespace.length);
            console.log(`Removing user endpoint: ${address}`);
            delete endpoints[address];
        });
        return watcher;
    }
}

module.exports = {RegistryBuilder};