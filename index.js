const express = require('express');
const mongoDB = require('./config/mongodb');
const loadRoutes = require('./managerRoutes');
const logger = require('./config/wingston');
const bodyParser = require('body-parser'); // Asegurarse de que este middleware está en uso
const path = require('path');

const app = express();
const routes = loadRoutes(app);
const PORT = process.env.PORT || 3000;
const url = `${process.env.TERMINAL_URL}${PORT}/home`;
const retries = 1; 
const delay = 10000; 

require('dotenv').config();

process.env.ROUTES = routes;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/home', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'view', 'main_view.html'));
});

app.post('/execute', async (req, res) => { 
    try{
        var command = command_value(req.body.command, req);
        let response;

        if (routes[command]) {
            response = new Promise((resolve, reject) => {
                routes[command](req, res)
                    .then(result => resolve(result))
                    .catch(error => reject(`Error executing command: ${error.message}`));
            });
        } else {
            response = Promise.resolve({ message: `Unknown command: ${command}. <br>You should try: get -l` });
        }
        
        response.then(result => res.send(result))
                .catch(error => res.status(500).send({ message: `Internal server error: ${error}` }));
        
    }catch(error){
        console.log("Error in execute: ", error);
    }
});

function command_value(command, req){
    if(command.indexOf("-") != -1){ //Si contiene - entra
        if(command.length - command.indexOf("-") <= 3){
            req.params.action = command.substring(command.indexOf("-")+1, command.length);
            return command.substring(0, command.indexOf("-")+1);
        }else{
            req.params.action = command.substring(command.indexOf("-")+3, command.length);
            return command.substring(0, command.indexOf("-")+2);
        }
    }
    return req.body.command;
}  

const connectWithRetry = async(retries, delay) =>{
    try{
        let attempt = 0;
        while (attempt < retries) {
            const collection = await mongoDB.connectToMongo();
            if (collection) {
                return collection;
            }
            attempt++;
            console.log(`Intento de conexión ${attempt} fallido. Reintentando en ${delay / 1000} segundos...`);
            //TODO: probar de hgacer una llamada de vuelta a connectWithRetry
            await new Promise(res => setTimeout(res, delay));
        }
        return null;
    }catch(Error){

    }
};

const startServer = async () => {

    const collection = await connectWithRetry(retries, delay);

    if (collection) {
        console.log("Conexión exitosa a MongoDB. Iniciando servidor...");
    } else {
        console.log("No se pudo conectar a MongoDB después de varios intentos. Pasando al modo sin conexión...");
        //TODO: guardar las cosas en un archivo y mandar info al front
    }

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        //logger.info("Init main page");
        /*import('open').then(open => {
            open.default(url).catch(err => {
                Log.info("Init main page");
                console.error('Failed to open URL:', err);
            });
        }).catch(err => {
            console.error('Failed to load open module:', err);
        });*/
    });
} 

startServer();