const express = require('express');
const router = express.Router();

/*router.get('/-/:action', async (req, res) => {
    const action = req.params.action;
    console.log("Entra en la acción que le toca con ", action);
    switch (action) {
        case 'summary':
            // Implementar la lógica para el comando "summary"
            res.json({ message: 'Resumen de objetivos' });
            break;
        default:
            res.status(400).json({ message: 'Comando no reconocido' });
    }
});*/

module.exports = router;