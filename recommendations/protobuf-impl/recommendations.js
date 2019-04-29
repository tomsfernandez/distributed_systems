const favoritesService = require('../services/favorites');
const catalogService = require('../services/catalog');
const notificationService = require('../services/notifications');
const protobuf = require('../protobuf');
const db = require('../db');

async function recommendUser(call, callback) {
    const userId = call.request.getUserId();
    console.log('Recommending user', userId);
    let favorites;
    try {
        favorites = await favoritesService.getFavorites({userId, fullProduct: true});
    } catch (e) {
        console.log('[ERROR] Unable to get products from favorites service', e);
        callback(e);
        return;
    }
    let tags = {};
    favorites.forEach(product => {
        product.getTagsList().forEach(tag => tags[tag] = null);
    });
    let productsToRecommend;
    try {
        productsToRecommend = await catalogService.filterProducts({
            tags: Object.keys(tags),
            excludeIds: favorites.map(product => product.getId()),
            limit: 10
        });
    } catch (e) {
        console.log('[ERROR] Unable to get products from catalog service', e);
        callback(e);
        return;
    }
    if (!productsToRecommend.length) return;
    let notificationContent = 'Dear customer, the following products may be of interest to you:\n';
    productsToRecommend.forEach(product => {
        notificationContent += `\t* ${product.getTitle()}\n`;
    });
    try {
        await notificationService.notifyUser({userId, content: notificationContent});
    } catch (e) {
        console.log('[ERROR] Unable to send notification', e);
        callback(e);
        return;
    }
    try {
        await db.updateHistory(userId, {last_recommendation: Date.now()});
    } catch (e) {
        console.log("Unable to update user history", e);
    }
    callback(null, new protobuf.empty.messages.Empty());
}

module.exports = {recommendUser};