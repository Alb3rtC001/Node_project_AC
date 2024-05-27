const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
    //name: { type: String, required: true }
});

const Goal = mongoose.model('Goal', goalSchema, 'Goal');

module.exports = Goal;