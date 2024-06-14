const express = require('express');
const router = express.Router();

router.get('/:action', async (req, res) => {
    const action = req.params.action;
    console.log("Entra en la acción que le toca con ", action);
    switch (action) {
        case 'h':
            console.log("Las rutas son: ", JSON.stringify(global.ROUTES));
            //TODO: Añadir un print para verse mejor
            res.json(global.ROUTES);
            break;
        case 'cl':
            // Implementar la lógica para el comando "summary"
            console.clear()
            break;
        default:
            res.status(400).json({ message: 'Comando no reconocido' });
    }
});

module.exports = router; 