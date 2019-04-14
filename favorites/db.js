const config = require('./config');

let db;

async function getFavorites(userId) {
    const collection = db.collection('favorites');
    return await collection.findOne({user_id: userId});
}

async function updateFavorites(userId, favorites) {
    const collection = db.collection('favorites');
    await collection.findOneAndReplace({user_id: userId}, favorites);
}

module.exports = {init, getFavorites, updateFavorites};

async function init() {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const url = `mongodb://${config.mongo.host}:${config.mongo.port}`;
    const MongoClient = require('mongodb').MongoClient;
    const client = new MongoClient(url, {useNewUrlParser:true});
    console.log(`Connecting to Mongo with url ${url} on db ${config.mongo.db}`);
    try {
        await client.connect();
    } catch (e) {
        console.log('Error connecting to database, retrying in 1 second', e);
        await connect();
        return;
    }
    console.log(`Connected to Mongo successfully`);
    db = client.db(config.mongo.db);
    await prepare(client);
}

async function prepare(client) {
    const faker = require('faker');

    const usersCollection = db.collection('users');
    if (await usersCollection.countDocuments({}) > 0) return;
    await usersCollection.deleteMany({});
    const newUsers = [];
    for (let i = 0; i < 10; i++) {
        newUsers.push({name: faker.name.findName()});
    }
    await usersCollection.insertMany(newUsers);

    const productsCollection = db.collection('products');
    await productsCollection.deleteMany({});
    const newProducts = [];
    for (let i = 0; i < 100; i++) {
        newProducts.push({title: faker.commerce.productName(), description: faker.lorem.sentence()});
    }
    await productsCollection.insertMany(newProducts);

    const products = await productsCollection.find({}).toArray();
    const favoritesCollection = db.collection('favorites');
    await favoritesCollection.deleteMany({});
    const newFavorites = [];
    (await usersCollection.find({}).toArray()).forEach(user => {
        const newFavorite = {user_id: user._id.toString(), products: []};
        for (let i = 0; i < 5; i++) {
            const productIndex = Math.floor(Math.floor(Math.random() * products.length));
            newFavorite.products.push(products[productIndex]._id.toString());
        }
        newFavorites.push(newFavorite);
    });
    await favoritesCollection.insertMany(newFavorites);
}