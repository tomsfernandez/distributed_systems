const protobuf = require('../protobuf');
const util = require('../util');

async function getFavorites({userId, fullProduct}) {
    const addresses = Object.keys(protobuf.favorites.grpc.clientInstances);
    console.log('Favorites clients:', addresses);
    for (let address of addresses) {
        const client = protobuf.favorites.grpc.clientInstances[address];
        const request = new protobuf.favorites.messages.GetFavoritesRequest();
        request.setUserId(userId);
        request.setFullProduct(fullProduct);
        try {
            const response = await util.timeoutPromise((callback) => {
                client.getFavorites(request, callback);
            }, 500);
            return response.getProductsList();
        } catch (e) {
            console.log(`Error getting products from favorites service ${address}:`, e);
        }
    }
    throw(new Error("All favorites service instances are down"));
}

module.exports = {getFavorites};