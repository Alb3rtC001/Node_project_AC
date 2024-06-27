
function getGoalJosn(){
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
    
    fetch('/api/goals/2024', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newGoal)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Objetivo creado:', data);
    })
    .catch(error => {
        console.error('Error al crear el objetivo:', error);
    });
    
}

//TODO: mejorar crear en general un función de print
function goalCommandList(){
    return ["year add_year", "all", "-l"]
}


const goalFn = {
    getGoalJosn,
    goalCommandList
};

module.exports = goalFn;