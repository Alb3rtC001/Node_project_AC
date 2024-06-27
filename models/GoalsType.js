const mongoose = require('mongoose');

//TODO: repasar
const goalsTypeSchema = new mongoose.Schema({
    Complete: Object,
    Study: Object,
    Sport: Object,
    Recordatory: Object,
    List: Object,
    General: Object
    
});

const GoalsType = mongoose.model('GoalsType', goalsTypeSchema, 'goalsType');

module.exports = GoalsType;