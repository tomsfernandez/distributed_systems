const config = require('./config');

class EtcdClient {

    constructor(client){
        this.client = client;
    }

    async register(){
        console.log('Registering instance to etcd');
        const lease = this.client.namespace('/notifications/instances/').lease(10);
        lease.on('lost', async err => {
            console.log('Lost lease of registered instance to etcd', err);
            console.log('Trying to re-grant it');
            await this.register();
        });
        await lease.put(`${config.host}:${config.port}`);
        console.log('Instance registered');
    }
}

module.exports = {EtcdClient};