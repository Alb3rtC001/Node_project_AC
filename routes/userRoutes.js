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

router.get('/-help', async (req, res) => {
    try {
        //TODO: eliminar /cambiar
        res.send([
            '---------------------------------------',
            'Las rutas conocidas son las siguientes:',
            'goal -g -c',
            'self -g -s',
            'self -p -s',
            'user -g',
            'user -p',
            'user -g --help',
            '---------------------------------------'
          ]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;