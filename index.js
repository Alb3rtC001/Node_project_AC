const express = require('express');
const connectToMongo = require('./config/mongodb');
const loadRoutes = require('./managerRoutes');
const logger = require('./config/wingston');
const path = require('path');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const url = `${process.env.TERMINAL_URL}${PORT}/home`;

// Los parsers tienen que registrarse ANTES que las rutas, si no req.body llega undefined
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const routes = loadRoutes(app);

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

app.get('/home', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'view', 'main_view.html'));
});

app.post('/execute', async (req, res) => {
    const raw = req.body && req.body.command;
    if (typeof raw !== 'string' || raw.trim() === '') {
        return res.status(400).send({ message: 'Missing command. <br>You should try: get -l' });
    }

    const command = command_value(raw.trim(), req);
    const handler = routes[command];
    if (!handler) {
        return res.send({ message: `Unknown command: ${command}. <br>You should try: get -l` });
    }

    // Los handlers responden ellos mismos (res.json / res.send); aquí solo capturamos errores
    try {
        await handler(req, res);
    } catch (error) {
        console.error('Error in execute:', error);
        if (!res.headersSent) {
            res.status(500).send({ message: `Internal server error: ${error.message}` });
        }
    }
});

// Middleware global de errores (debe ir el último)
app.use((err, req, res, next) => {
    console.error(err);
    if (res.headersSent) return next(err);
    res.status(500).json({ message: err.message || 'Internal server error' });
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
    return command;
}   