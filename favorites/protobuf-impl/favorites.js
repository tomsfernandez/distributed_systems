const db = require('../db');
const protobuf = require('../protobuf');
const catalogService = require('../services/catalog');

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
        if (call.request.getFullProduct()) {
            products = await catalogService.getProductsBatch({ids: favorites.products});
        }
        if (products) response.setProductsList(products);
        else {
            for (let productId of favorites.products) {
                const product = new protobuf.product.messages.Product();
                product.setId(productId);
                response.getProductsList().push(product);
            }
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