const protobuf = require('../protobuf');
const util = require('../util');

async function listUsers({lastAccessMax}) {
    const addresses = Object.keys(protobuf.users.grpc.clientInstances);
    console.log('Users clients:', addresses);
    for (let address of addresses) {
        const client = protobuf.users.grpc.clientInstances[address];
        const request = new protobuf.users.messages.ListUsersRequest();
        request.setLastAccessMax(lastAccessMax);
        try {
            const response = await util.timeoutPromise((callback) => {
                client.listUsers(request, callback);
            }, 500);
            return response.getUsersList();
        } catch (e) {
            console.log(`Error getting users from users service ${address}:`, e);
        }
    }
    throw(new Error("All users service instances are down"));
}

module.exports = {listUsers};