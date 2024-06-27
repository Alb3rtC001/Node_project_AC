const express = require('express');
const { goalValidationRules, validate } = require('../validateModel/goalValidator');
const router = express.Router();
const { body } = require('express-validator');
const Goal = require('../models/Goal');
const { exceptions } = require('winston');
const goalFn = require('../utils/goalFn')

const newGoal = {
    name: 'Nuevo objetivo',
    type: 'Complete',
    description: 'Descripción del nuevo objetivo',
    deadline: new Date('2025-01-01'),
    schedule: {
        horas: null,
        day: null,
        week: [0, 0, 0, 0, 0, 0, 0],
        month: {
            En: 0, Fb: 0, Mr: 0, Ab: 0, My: 0,
            Jn: 0, Jl: 0, Ag: 0, St: 0, Oc: 0,
            Nb: 0, Dc: 0
        }
    },
    startDate: new Date(),
    lastUpdate: new Date(),
    countUpdates: 0,
    status: false,
    progress: [{
        date: new Date(),
        notes: 'Notas de progreso',
        status: false
    }]
};

router.post('/-c/:action', async (req, res) => { //goalValidationRules(), validate,
    try {
        const action = req.params.action;
        switch (true) {
            case action == "new goal":
                let year = new Date().getFullYear().toString();
                let goalDocument = await Goal.find({ [year] : { $exists: true } });
                //TODO: Si no existe crear uno
                /*
                goalDocument = new Goal({
                    [year]: {
                        goals: [],
                        totalGoalsCreated: 0,
                        totalGoalsCompleted: 0,
                        author: '0001' // Ajustar el autor según sea necesario
                    }
                });
                */

                if (!res.status(200)) {
                    throw new Error("Error in goalDocuement no year found");
                }else{
                    goalDocument[0]["_doc"][year].goals.push(newGoal);
                    goalDocument[0]["_doc"][year].totalGoalsCreated++;
                    await goalDocument[0].save();
                    res.status(201).json("Objeto enviado correctamente");
                }
                break;
            default:
                res.status(400).json({ message: 'Comando no reconocido ' +  action});
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Comando específico para objetivos
router.get('/-c/:action', async (req, res) => {
    try{
        const action = req.params.action;
        console.log("action", action);
        switch (true) {
            case action == "list":
                res.json({ message:  "Para el comando -get de goal- existen los siguientes commandos: " + goalFn.goalCommandList()});
                break;
            case action =='all':
                const goals = await Goal.find({});
                if(!res.status(200)){
                    throw new Error("Erro in get goal -c all");
                } else{
                    console.log(goals);
                    res.json({ message:  JSON.stringify(goals)});
                }
                break;
            case action.includes("year"):
                year = action.split(" ")[1];
                let goalYear = await Goal.find({ [year] : { $exists: true } });
                if(!res.status(200)){
                    res.json({ message:  "No se ha encontrado ninguna meta con el año: "+ year});
                }else{
                    res.json({ message:  JSON.stringify(goalYear)});
                }
                break;
            default:
                res.status(400).json({ message: 'Comando no reconocido ' +  action + " <br>Puede que quieras hechar un vistazo a la lista de commandos de goals haciendo: get goal -c list"});
        }
    }catch(error){
        console.error(error.message);
    }
    
});

module.exports = router;