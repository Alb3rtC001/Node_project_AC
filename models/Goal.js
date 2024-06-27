const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
    year: {
        type: mongoose.Schema.Types.Mixed,
        goals: [{
            name: String,
            type: String,
            description: String,
            deadline: Date,
            schedule: {
                horas: Number,
                day: Number,
                week: [Number],
                month: {
                    En: Number,
                    Fb: Number,
                    Mr: Number,
                    Ab: Number,
                    My: Number,
                    Jn: Number,
                    Jl: Number,
                    Ag: Number,
                    St: Number,
                    Oc: Number,
                    Nb: Number,
                    Dc: Number
                }
            },
            startDate: Date,
            lastUpdate: Date,
            countUpdates: Number,
            status: Boolean,
            progress: [{
                date: Date,
                notes: String,
                status: Boolean
            }]
        }],
        totalGoalsCreated: Number,
        totalGoalsCompleted: Number,
        author: String
    }
});

const Goal = mongoose.model('Goal', goalSchema, 'goal');

module.exports = Goal;
