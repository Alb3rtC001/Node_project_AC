const express = require('express');
const GoalsType = require('../models/GoalsType');
const router = express.Router();

// Ruta para obtener todos los nombres en la colección "self"
router.get('/', async (req, res) => {
    try {
        const names = await GoalsType.find({}); // Solo selecciona el campo "name"
        res.send(names);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ruta para agregar un nuevo documento en la colección "self"
router.post('/', async (req, res) => {
    const goalsType = new GoalsType({
        name: req.body.name
    });
    try {
        const newGoalsType = await goalsType.save();
        res.status(201).json(newGoalsType);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;