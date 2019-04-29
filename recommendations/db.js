let db;

async function getHistory(userId) {
    return await db.collection('history').findOne({user_id: userId});
}

async function updateHistory(userId, history) {
    if (await getHistory(userId)) {
        await db.collection('history').findOneAndUpdate({user_id: userId}, buildUpdate(history));
    } else {
        history.user_id = userId;
        await db.collection('history').insertOne(history);
    }
}

function buildUpdate(object) {
    const update = {$set: {}};
    Object.keys(object).forEach(property => update.$set[property] = object[property]);
    return update;
}

module.exports = {init, getHistory, updateHistory};

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
}