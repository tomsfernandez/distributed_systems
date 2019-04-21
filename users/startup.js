const MongoClient = require('mongodb').MongoClient;
const config = require('./config');

async function getUserCollection(){
    await new Promise(resolve => setTimeout(resolve, 1000));
    const url = `mongodb://${config.mongo.host}:${config.mongo.port}`;
    const client = new MongoClient(url, {useNewUrlParser:true});
    console.log(`Connecting to Mongo with url ${url} on db ${config.mongo.db}`);
    await client.connect();
    console.log(`Connected to Mongo successfully`);
    return client.db(config.mongo.db).collection('users');
}

module.exports = {getUserCollection}