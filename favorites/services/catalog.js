const protobuf = require('../protobuf');
const util = require('../util');

async function getProductsBatch({ids}) {
    const addresses = Object.keys(protobuf.catalog.grpc.clientInstances);
    console.log('Catalog clients:', addresses);
    for (let address of addresses) {
        const client = protobuf.catalog.grpc.clientInstances[address];
        const request = new protobuf.catalog.messages.BatchProductRequest();
        request.setIdsList(ids);
        try {
            const response = await util.timeoutPromise((callback) => {
                client.getProductBatch(request, callback);
            }, 500);
            return response.getProductsList();
        } catch (e) {
            console.log(`Error getting products from catalog service ${address}:`, e);
        }
    }
    throw(new Error("All catalog service instances are down"));
}

module.exports = {getProductsBatch};