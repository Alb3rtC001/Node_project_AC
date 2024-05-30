const express = require('express');
const YearGoals = require('../models/Goal');
const router = express.Router();
/*
// Ruta para obtener todas las metas de un año
router.get('-c/:year', async (req, res) => {
    try {
        const year = req.params.year;
        const yearGoals = await YearGoals.findById(year);
        if (!yearGoals) {
            return res.status(404).json({ message: 'No goals found for this year' });
        }
        res.json(yearGoals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ruta para agregar una nueva meta a un año específico
router.post('-c/:year', async (req, res) => {
    try {
        const year = req.params.year;
        const goalId = `goal${Date.now()}`; // Genera un ID único basado en la fecha actual
        const goal = req.body;
        let yearGoals = await YearGoals.findById(year);

        if (!yearGoals) {
            yearGoals = new YearGoals({
                _id: year,
                year: year,
                goals: { [goalId]: goal },
                totalGoalsCreated: 1,
                totalGoalsCompleted: 0,
                author: req.body.author
            });
        } else {
            yearGoals.goals.set(goalId, goal);
            yearGoals.totalGoalsCreated += 1;
        }

        await yearGoals.save();
        res.status(201).json(yearGoals);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});*/

// Comando específico para objetivos
router.get('/-c/:action', async (req, res) => {
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
});

module.exports = router;