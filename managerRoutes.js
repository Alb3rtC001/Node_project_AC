const fs = require('fs');
const path = require('path');

const loadRoutes = (app) => {
    const routesPath = path.join(__dirname, 'routes');
    const routes = {};

    fs.readdirSync(routesPath).forEach(file => {
        const routePath = path.join(routesPath, file);
        const route = require(routePath);
        const routeName = file.split('.')[0]; // Usa el nombre del archivo como nombre de ruta
        app.use(`/api/${routeName}`, route);

        // Añadir las funciones de las rutas al objeto routes
        route.stack.forEach(layer => {
            if (layer.route && layer.route.path) {
                const method = Object.keys(layer.route.methods)[0];
                const key = `${routeName}.${method}.${layer.route.path.replace('/', '')}`;
                routes[key] = layer.route.stack[0].handle;
            }
        });
    });

    return routes;
};

module.exports = loadRoutes;
