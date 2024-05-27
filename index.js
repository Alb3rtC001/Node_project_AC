const express = require('express');
const connectToMongo = require('./config/mongodb');
const loadRoutes = require('./managerRoutes');
const bodyParser = require('body-parser'); // Asegúrate de que este middleware está en uso
require('dotenv').config();

const app = express();
const routes = loadRoutes(app);
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectToMongo();
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
