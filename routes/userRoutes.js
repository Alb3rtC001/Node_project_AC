const express = require('express');
const Users = require('../models/Users');
const router = express.Router();

// Ruta para obtener todos los nombres en la colección "User"
router.get('/', async (req, res) => {
    try {
        const names = await Users.find({}); // Solo selecciona el campo "name"
        res.json(names);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ruta para agregar un nuevo documento en la colección "User"
router.post('/', async (req, res) => {
    const user = new Users({
        name: req.body.name
    });
    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;