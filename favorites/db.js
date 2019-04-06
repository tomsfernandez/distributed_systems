const MongoClient = require('mongodb').MongoClient;
const dbName = process.env.MONGO_DB;
const client = new MongoClient(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`, {useNewUrlParser:true,reconnectTries:30,reconnectInterval:1000});

async function init() {
    await client.connect();
    await prepare();
}

async function getFavorites(user_id) {
    const collection = getCollection('favorites');
    return await collection.findOne({user_id});
}

async function updateFavorites(user_id, favorites) {
    const collection = getCollection('favorites');
    await collection.findOneAndReplace({user_id}, favorites);
}

module.exports = {init, getFavorites, updateFavorites};

function getCollection(name) {
    return client.db(dbName).collection(name);
}

async function prepare() {
    const faker = require('faker');

    const usersCol = getCollection('users');
    if (await usersCol.countDocuments({}) > 0) return;
    await usersCol.deleteMany({});
    const newUsers = [];
    for (let i = 0; i < 10; i++) {
        newUsers.push({name: faker.name.findName()});
    }
    await usersCol.insertMany(newUsers);

    const productsCol = getCollection('products');
    await productsCol.deleteMany({});
    const newProducts = [];
    for (let i = 0; i < 100; i++) {
        newProducts.push({title: faker.commerce.productName(), description: faker.lorem.sentence()});
    }
    await productsCol.insertMany(newProducts);

    const products = await productsCol.find({}).toArray();
    const favoritesCol = getCollection('favorites');
    await favoritesCol.deleteMany({});
    const newFavorites = [];
    (await usersCol.find({}).toArray()).forEach(user => {
        const newFavorite = {user_id: user._id.toString(), products: []};
        for (let i = 0; i < 5; i++) {
            const productIndex = Math.floor(Math.floor(Math.random() * products.length));
            newFavorite.products.push(products[productIndex]._id.toString());
        }
        newFavorites.push(newFavorite);
    });
    await favoritesCol.insertMany(newFavorites);
}