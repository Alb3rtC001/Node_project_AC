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

app.post('/execute', async (req, res) => {  // Cambiar la función a async
    const command = req.body.command;
    let response;

    if (routes[command]) {
        try {
            response = await routes[command](req, res); // Pasa req y res a la función
        } catch (error) {
            response = `Error executing command: ${error.message}`;
        }
    } else {
        response = `Unknown command: ${command}`;
    }

    res.json({ response });
});
