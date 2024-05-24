const express = require('express');
const connectToMongo = require('./config/mongodb');
const loadRoutes = require('./managerRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

//Middleware
app.use(express.json());

loadRoutes(app);

app.listen(PORT, () => {
    console.log("Server is running");
    connectToMongo();
});

app.get('/test', (req, res) => {
    res.send('API is running');
});
