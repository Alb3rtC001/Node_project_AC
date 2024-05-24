const mongoose = require('mongoose');

const selfSchema = new mongoose.Schema({
    name: { type: String, required: true }
});

const Self = mongoose.model('Self', selfSchema, 'self');

module.exports = Self;