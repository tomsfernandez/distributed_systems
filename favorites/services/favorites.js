const {CatalogService} = require("./CatalogService");
const db = require('../db');
const protobuf = require('../protobuf');

async function getFavorites(catalogService, call, callback) {
    let favoriteObject;
    try {
        favoriteObject = await db.getFavorites(call.request.getUserId());
    } catch (e) {
        callback(e);
    }
    const response = new protobuf.product.messages.ProductList();
    if (favoriteObject && favoriteObject.products.length) {
        let products;
        if (call.request.getWithProductDescription()) {
            products = {};
            const productsResponse = await catalogService.getProductBatch(favoriteObject.products);
            for (let product of productsResponse.getProductsList()) {
                products[product.getId()] = product;
            }
        }
        for (let productId of favoriteObject.products) {
            const product = new protobuf.product.messages.Product();
            product.setId(productId);
            if (products) {
                product.setTitle(products[productId].getTitle());
                product.setDescription(products[productId].getDescription());
            }
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