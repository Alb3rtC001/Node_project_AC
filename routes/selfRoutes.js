const express = require('express');
const Self = require('../models/Self');
const router = express.Router();

// Ruta para obtener todos los nombres en la colección "self"
router.get('/-s', async (req, res) => {
    try {
        const names = await Self.find({}); // Solo selecciona el campo "name"
        res.send(names);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ruta para agregar un nuevo documento en la colección "self"
router.post('/-s', async (req, res) => {
    const self = new Self({
        name: req.body.name
    });
    try {
        const newSelf = await self.save();
        res.status(201).json(newSelf);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;