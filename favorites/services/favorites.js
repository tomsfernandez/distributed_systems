const db = require('../db');
const protobuf = require('../protobuf');

async function getFavorites(call, callback) {
    let favorites;
    try {
        favorites = await db.getFavorites(call.request.getUserId());
    } catch (e) {
        callback(e);
    }
    const response = new protobuf.product.messages.ProductList();
    if (favorites && favorites.products.length) {
        let products;
        if (call.request.getWithProductDescription()) {
            for (let i = 0; i < protobuf.catalog.grpc.instantiatedClients.length; i++) {
                const catalogClient = protobuf.catalog.grpc.instantiatedClients[i];
                const productsRequest = new protobuf.catalog.messages.BatchProductRequest();
                productsRequest.setIdsList(favorites.products);
                try {
                    const productsResponse = await new Promise((resolve, reject) => {
                        let fulfilled = false;
                        let canceled = false;
                        catalogClient.getProductBatch(productsRequest, (err, response) => {
                            if (canceled) return;
                            fulfilled = true;
                            err ? reject(err) : resolve(response);
                        });
                        setTimeout(() => {
                            if (!fulfilled) {
                                canceled = true;
                                reject(new Error(`Timeout of ${process.env.LOAD_BALANCING_TIMEOUT} ms exceeded`));
                            }
                        }, process.env.LOAD_BALANCING_TIMEOUT);
                    });
                    products = {};
                    for (let product of productsResponse.getProductsList()) {
                        products[product.getId()] = product;
                    }
                    break;
                } catch (e) {
                    console.error(`Error getting products from catalog service with client ${i+1} of ${protobuf.catalog.grpc.instantiatedClients.length}`, e);
                }
            }
        }
        for (let productId of favorites.products) {
            const product = new protobuf.product.messages.Product();
            product.setId(productId);
            if (products) product.setDescription(products[productId].getDescription());
            response.getProductsList().push(product);
        }
    }
    callback(null, response);
}

async function updateFavorites(call, callback) {
    let favorites;
    try {
        favorites = await db.getFavorites(call.request.getUserId());
    } catch (e) {
        callback(e);
    }
    if (favorites) {
        favorites.products = favorites.products.filter((id => {
            return !call.request.getRemoveProductIdsList().includes(id);
        }));
        for (let addId of call.request.getAddProductIdsList()) {
            if (addId && !favorites.products.includes(addId)) {
                favorites.products.push(addId);
            }
        }
        try {
            await db.updateFavorites(call.request.getUserId(), favorites);
        } catch (e) {
            callback(e);
        }
    }
    callback(null, new protobuf.empty.messages.Empty());
}

module.exports = {getFavorites, updateFavorites};