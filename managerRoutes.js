const fs = require('fs');
const path = require('path');

const loadRoutes = (app) => {
    const routesPath = path.join(__dirname, 'routes');
    const routes = {};

    fs.readdirSync(routesPath).forEach(file => {
        const routePath = path.join(routesPath, file);
        const route = require(routePath);
        const routeName = file.split('Routes.')[0]; // Usa el nombre del archivo como nombre de ruta
        app.use(`/${routeName}`, route);
        // Añadir las funciones de las rutas al objeto routes
        route.stack.forEach(layer => {
            if (layer.route && layer.route.path) {
                var method = Object.keys(layer.route.methods)[0];
                //Aqui poner la ruta que esta en la url y ahcer un slice para luego hace run post
                const key = `${method} ${routeName}` + (layer.route.path.replace('/', '') != "" ? ` ${layer.route.path.replace('/', '').replace('/', '').split(":")[0]}` : '');
                layer.route.stack[0].params = layer.route.path.replace('/', '').replace('/', '').split(":")[1];1
                routes[key] = layer.route.stack[0].handle;
            }
        });
    });

    return routes;
};

module.exports = loadRoutes;