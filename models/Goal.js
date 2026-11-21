const mongoose = require('mongoose');

/*
 * Forma de los datos en la colección "goal" (un documento por año, la clave ES el año):
 * {
 *   "2024": {
 *     goals: [goal, ...],
 *     totalGoalsCreated: Number,
 *     totalGoalsCompleted: Number,
 *     author: String
 *   }
 * }
 *
 * Como la clave del año es dinámica, Mongoose no puede tiparla en el schema.
 * Con `strict: false` Mongoose deja leer y escribir esas claves (antes el schema
 * solo tenía un campo literal "year" y todo lo demás se ignoraba al guardar).
 * Las escrituras se hacen con operadores atómicos ($push / $inc) en goalRoutes.
 *
 * Schema de referencia de un goal (documentación; la validación de entrada va en validateModel):
 * {
 *   name: String, type: String, description: String, deadline: Date,
 *   schedule: { horas: Number, day: Number, week: [Number],
 *               month: { En, Fb, Mr, Ab, My, Jn, Jl, Ag, St, Oc, Nb, Dc: Number } },
 *   startDate: Date, lastUpdate: Date, countUpdates: Number, status: Boolean,
 *   progress: [{ date: Date, notes: String, status: Boolean }]
 * }
 */
const goalSchema = new mongoose.Schema({}, { strict: false });

const Goal = mongoose.model('Goal', goalSchema, 'goal');

module.exports = Goal;
