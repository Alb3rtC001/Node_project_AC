const mongoose = require('mongoose');
require('dotenv').config();

const connectToMongo = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Salir del proceso con error
    }
};

module.exports = connectToMongo;