let db;

async function init() {
    await connect();
    await prepare();
}

async function getFavorites(user_id) {
    const collection = db.collection('favorites');
    return await collection.findOne({user_id});
}

async function updateFavorites(user_id, favorites) {
    const collection = db.collection('favorites');
    await collection.findOneAndReplace({user_id}, favorites);
}

module.exports = {init, getFavorites, updateFavorites};

async function connect() {
    try {
        const MongoClient = require('mongodb').MongoClient;
        const client = new MongoClient(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`, {useNewUrlParser:true});
        await client.connect();
        db = client.db(process.env.MONGO_DB);
    } catch (e) {
        console.error('Error connecting to database, retrying in 1 second', e);
        await new Promise(resolve => setTimeout(resolve, 1000));
        await connect();
    }
}

async function prepare() {
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