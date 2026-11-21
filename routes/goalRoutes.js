const express = require('express');
const router = express.Router();
const Goal = require('../models/Goal');
const goalFn = require('../utils/goalFn');

router.post('/-c/:action', async (req, res) => { //goalValidationRules(), validate,
    try {
        const action = req.params.action;
        switch (true) {
            case action == "new goal": {
                const year = new Date().getFullYear().toString();
                // $push / $inc son atómicos y Mongoose sí los envía a la BD.
                // upsert: si no existe el documento del año, lo crea.
                await Goal.updateOne(
                    { [year]: { $exists: true } },
                    {
                        $push: { [`${year}.goals`]: goalFn.createDefaultGoal() },
                        $inc: { [`${year}.totalGoalsCreated`]: 1 },
                        $setOnInsert: {
                            [`${year}.totalGoalsCompleted`]: 0,
                            [`${year}.author`]: '0001' // TODO: autor real cuando haya usuarios
                        }
                    },
                    { upsert: true }
                );
                res.status(201).json({ message: "Objetivo creado correctamente en " + year });
                break;
            }
            default:
                res.status(400).json({ message: 'Comando no reconocido ' +  action});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

// Comando específico para objetivos
router.get('/-c/:action', async (req, res) => {
    try{
        const action = req.params.action;
        switch (true) {
            case action == "list":
                res.json({ message:  "Para el comando -get de goal- existen los siguientes commandos: " + goalFn.goalCommandList()});
                break;
            case action =='all': {
                const goals = await Goal.find({});
                res.json({ message:  JSON.stringify(goals)});
                break;
            }
            case action.startsWith("year"): {
                const year = action.split(" ")[1];
                if (!/^\d{4}$/.test(year || "")) {
                    res.status(400).json({ message: "Indica un año válido, por ejemplo: get goal -c year 2024" });
                    break;
                }
                const goalYear = await Goal.find({ [year] : { $exists: true } });
                if (goalYear.length === 0) {
                    res.json({ message:  "No se ha encontrado ninguna meta con el año: "+ year});
                } else {
                    res.json({ message:  JSON.stringify(goalYear)});
                }
                break;
            }
            default:
                res.status(400).json({ message: 'Comando no reconocido ' +  action + " <br>Puede que quieras hechar un vistazo a la lista de commandos de goals haciendo: get goal -c list"});
        }
    }catch(error){
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
