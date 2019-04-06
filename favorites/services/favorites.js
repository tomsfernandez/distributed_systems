const grpc = require('grpc');
const util = require('util');
const db = require('../db');
const protobuf = require('../protobuf');

async function getFavorites(call, callback) {
    try {
        const favoritesDb = await db.getFavorites(call.request.getUserId());
        const favorites = new protobuf.product.messages.ProductList();
        if (favoritesDb && favoritesDb.products.length) {
            let products;
            if (call.request.getWithProductDescription()) {
                const catalogClient = new protobuf.catalog.grpc.CatalogClient('192.168.99.100:50051', grpc.credentials.createInsecure());
                const productsRequest = new protobuf.catalog.messages.BatchProductRequest();
                productsRequest.setIdsList(favoritesDb.products);
                try {
                    await util.promisify(catalogClient.getProductBatch)(productsRequest);
                    products = {};
                    for (let product of response.getProductsList()) {
                        products[product.getId()] = product;
                    }
                } catch (e) {
                    console.error('Error getting products from catalog service', e);
                }
            }
            for (let productId of favoritesDb.products) {
                const product = new protobuf.product.messages.Product();
                product.setId(productId);
                if (products) product.setDescription(products[productId].getDescription());
                favorites.getProductsList().push(product);
            }
        }
        callback(null, favorites);
    } catch (e) {
        callback(e);
    }
}

async function updateFavorites(call, callback) {
    try {
        const favorites = await db.getFavorites(call.request.getUserId());
        if (favorites) {
            favorites.products = favorites.products.filter((id => {
                return !call.request.getRemoveProductIdsList().includes(id);
            }));
            for (let addId of call.request.getAddProductIdsList()) {
                if (addId && !favorites.products.includes(addId)) {
                    favorites.products.push(addId);
                }
            }
            await db.updateFavorites(call.request.getUserId(), favorites);
        }
        callback(null, new protobuf.empty.messages.Empty());
    } catch (e) {
        callback(e);
    }
}

module.exports = {getFavorites, updateFavorites};