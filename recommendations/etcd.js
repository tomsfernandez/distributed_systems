const { Etcd3 } = require('etcd3');
const config = require('./config');
const host = `${config.host}:${config.port}`;
const client = new Etcd3({hosts: `${config.etcd.host}:${config.etcd.port}`});

async function register() {
    console.log('Registering instance to etcd');
    const lease = client.namespace('/recommendations/instances/').lease(10);
    lease.on('lost', async err => {
        console.log('Lost lease of registered instance to etcd', err);
        console.log('Trying to re-grant it');
        await register();
    });
    await lease.put(host);
    console.log('Instance registered');
    await masterLock();
}

async function masterLock() {
    console.log('Attempting to get master lock');
    const masterLockKey = '/recommendations/master';
    let result;
    try {
        result = await client.if(masterLockKey, 'Create', '==', 0)
            .then(client.put(masterLockKey).value(host))
            .else(client.get(masterLockKey))
            .commit();
    } catch (e) {
        console.log("Failed attempt to acquire master lock", e);
        return false;
    }
    let ok = false;
    if (result.succeeded) ok = true;
    else {
        const currentMasterHost = result.responses[0].response_range.kvs[0].value.toString();
        ok = currentMasterHost === host;
    }
    if (ok) await client.lease(10).put(masterLockKey).value(host);
    console.log(ok ? 'Master lock acquired' : 'Master lock not acquired');
    return ok;
}

module.exports = {register, client, masterLock};