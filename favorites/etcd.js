const { Etcd3 } = require('etcd3');
const config = require('./config');
const client = new Etcd3({hosts:`${config.etcd.host}:${config.etcd.port}`});

async function register() {
    console.log('Registering instance to etcd');
    const lease = client.namespace('/favorites/instances/').lease(10);
    lease.on('lost', async err => {
        console.log('Lost lease of registered instance to etcd', err);
        console.log('Trying to re-grant it');
        await register();
    });
    await lease.put(`${config.host}:${config.port}`);
    console.log('Instance registered');
}

module.exports = {register, client};