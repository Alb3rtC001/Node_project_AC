const express = require('express');
const router = express.Router();

router.get('/:action', async (req, res) => {
    const action = req.params.action;
    console.log("Entra en la acción que le toca con ", action);
    switch (action) {
        case 'h':
            res.json(global.ROUTES); //imprime todos los comandos || es el --help
            break;
        case 'cl':
            console.clear() //Clear console node
            break;
        default:
            res.status(400).json({ message: 'Comando no reconocido' });
    }
});

module.exports = router; 