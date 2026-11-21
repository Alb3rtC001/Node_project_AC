
// Devuelve un goal nuevo cada vez (las fechas se calculan en el momento de la petición)
function createDefaultGoal(){
    const now = new Date();
    const deadline = new Date(now.getFullYear() + 1, 0, 1); // 1 de enero del año siguiente
    return {
        name: 'Nuevo objetivo',
        type: 'Complete',
        description: 'Descripción del nuevo objetivo',
        deadline,
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
        startDate: now,
        lastUpdate: now,
        countUpdates: 0,
        status: false,
        progress: [{
            date: now,
            notes: 'Notas de progreso',
            status: false
        }]
    };
}

//TODO: mejorar crear en general un función de print
function goalCommandList(){
    return ["year add_year", "all", "-l"]
}


const goalFn = {
    createDefaultGoal,
    goalCommandList
};

module.exports = goalFn;
