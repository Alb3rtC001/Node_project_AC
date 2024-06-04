const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    deadline: { type: Date },
    schedule: {
        horas: { type: Number, default: null },
        day: { type: Number, default: null },
        week: { type: [Number], default: [0, 0, 0, 0, 0, 0, 0] },
        month: {
            En: { type: Number, default: 0 },
            Fb: { type: Number, default: 0 },
            Mr: { type: Number, default: 0 },
            Ab: { type: Number, default: 0 },
            My: { type: Number, default: 0 },
            Jn: { type: Number, default: 0 },
            Jl: { type: Number, default: 0 },
            Ag: { type: Number, default: 0 },
            St: { type: Number, default: 0 },
            Oc: { type: Number, default: 0 },
            Nb: { type: Number, default: 0 },
            Dc: { type: Number, default: 0 }
        }
    },
    startDate: { type: Date },
    lastUpdate: { type: Date },
    countUpdates: { type: Number, default: 0 },
    status: { type: Boolean, default: false },
    progress: [{
        date: { type: Date },
        notes: { type: String },
        status: { type: Boolean }
    }],
    goalType: { type: String, required: true }
}, { discriminatorKey: 'goalType' });

const Goal = mongoose.model('Goal', goalSchema);