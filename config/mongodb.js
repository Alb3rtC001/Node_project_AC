const { MongoClient } = require("mongodb");
require('dotenv').config();

let client = null;
let isConnected = false;
let collection = null;

const connectToMongo = async () => {
    if (isConnected) {
        console.log("Ya conectado a MongoDB");
        return collection;
    }

    try {
        if (!client) {
            client = new MongoClient(process.env.MONGO_URL);
        }

        await client.connect();

        const database = client.db(process.env.MONGO_DB_NAME);
        collection = database.collection('lifeManage');

        isConnected = true;
        console.log("Conectado a MongoDB");

        return collection;
    } catch (error) {
        console.error('Error conectando a MongoDB:', error);
        return null;
    }
};

const closeConnection = async () => {
    if (client && isConnected) {
        await client.close();
        isConnected = false;
        console.log("Conexión a MongoDB cerrada");
    }
};

module.exports = { connectToMongo, closeConnection };