let db;

async function getFavorites(userId) {
    return await db.collection('favorites').findOne({user_id: userId});
}

async function updateFavorites(userId, favorites) {
    if (await getFavorites(userId)) {
        await db.collection('favorites').findOneAndUpdate({user_id: userId}, buildUpdate(favorites));
    } else {
        favorites.user_id = userId;
        await db.collection('favorites').insertOne(favorites);
    }
}

function buildUpdate(object) {
    const update = {$set: {}};
    Object.keys(object).forEach(property => update.$set[property] = object[property]);
    return update;
}

module.exports = {init, getFavorites, updateFavorites};

async function init() {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const config = require('./config');
    const url = `mongodb://${config.mongo.host}:${config.mongo.port}`;
    const MongoClient = require('mongodb').MongoClient;
    const client = new MongoClient(url, {useNewUrlParser:true});
    console.log(`Connecting to Mongo with url ${url} on db ${config.mongo.db}`);
    await client.connect();
    console.log(`Connected to Mongo successfully`);
    db = client.db(config.mongo.db);
    await fake(client);
}

async function fake(client) {
    const faker = require('faker');

    const usersCollection = client.db('users').collection('users');
    if (await usersCollection.countDocuments({}) > 0) return;
    await usersCollection.deleteMany({});
    const newUsers = [];
    for (let i = 0; i < 10; i++) {
        const last_access = Math.random() > 0.5 ? faker.date.past().getTime() : faker.date.recent().getTime();
        newUsers.push({name: faker.name.findName(), email: faker.internet.email(), last_access});
    }
    await usersCollection.insertMany(newUsers);

    const productsCollection = client.db('catalog').collection('products');
    await productsCollection.deleteMany({});
    const newProducts = [];
    for (let i = 0; i < 100; i++) {
        const rating = Math.floor(Math.random() * 5 + 1);
        const tagCount = Math.floor(Math.random() * 3 + 1);
        const tags = [];
        for (let j = 0; j < tagCount; j++) {
            const tag = faker.commerce.productAdjective();
            if (!tags.includes(tag)) tags.push(tag);
        }
        newProducts.push({title: faker.commerce.productName(), description: faker.lorem.sentence(), rating, tags});
    }
    await productsCollection.insertMany(newProducts);

    const products = await productsCollection.find({}).toArray();
    const favoritesCollection = db.collection('favorites');
    await favoritesCollection.deleteMany({});
    const newFavorites = [];
    (await usersCollection.find({}).toArray()).forEach(user => {
        const newFavorite = {user_id: user._id.toString(), products: []};
        for (let i = 0; i < 5; i++) {
            const productIndex = Math.floor(Math.random() * products.length);
            newFavorite.products.push(products[productIndex]._id.toString());
        }
        newFavorites.push(newFavorite);
    });
    await favoritesCollection.insertMany(newFavorites);
}