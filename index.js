const express = require('express');
const connectToMongo = require('./config/mongodb');
const loadRoutes = require('./managerRoutes');
const logger = require('./config/wingston');
const bodyParser = require('body-parser'); // Asegurarse de que este middleware está en uso

require('dotenv').config();

const app = express();
const routes = loadRoutes(app);
const PORT = process.env.PORT || 3000;
const url = `${process.env.TERMINAL_URL}${PORT}/home`;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    //logger.info("Init main page");
    connectToMongo();
    /*import('open').then(open => {
        open.default(url).catch(err => {
            Log.info("Init main page");
            console.error('Failed to open URL:', err);
        });
    }).catch(err => {
        console.error('Failed to load open module:', err);
    });*/
});

app.get('/home', function(request, response) {
    response.sendFile(__dirname + '/public/view/main_view.html');
});

app.post('/execute', async (req, res) => { 
    try{
        var command = req.body.command;
        let response;
        if(command.indexOf("-") != -1){
            req.params.action = command.substring(command.indexOf("-")+3, command.length);
            command = command.substring(0, command.indexOf("-")+3);
        }
        //TODO: Error no entre en el else se queda pending
        if (routes[command]) {
            try {
                response = await routes[command](req, res); 
            } catch (error) {
                response = `Error executing command: ${error.message}`;
            }
        } else if(command == "--h"){
            //TODO: Hacer aqui el help y poner las routas de comandos
            console.log("->", routes);
        } else {
            response = `Unknown command: ${command}`;
        }
    }catch(error){
        console.log("Error in execute: ", error);
    }
});
