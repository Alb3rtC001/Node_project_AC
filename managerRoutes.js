const fs = require('fs');
const path = require('path');

const loadRoutes = (app) => {
    const routesPath = path.join(__dirname, 'routes');
    const routes = {};
    const all_routes = [];

    fs.readdirSync(routesPath).forEach(file => {
        const routePath = path.join(routesPath, file);
        const route = require(routePath);
        const routeName = file.split('Routes.')[0]; // Usa el nombre del archivo como nombre de ruta
        app.use(`/${routeName}`, route); 
        route.stack.forEach(layer => { // Añadir las funciones de las rutas al objeto routes
            if (layer.route && layer.route.path) {
                var method = Object.keys(layer.route.methods)[0];
                var additions = "";
                if(layer.route.path.includes(":")) additions = " add_value";
                var key = `${method} ${routeName}` + (layer.route.path.replace('/', '') != "" ? ` ${layer.route.path.replace('/', '').replace('/', '').split(":")[0]}` : ''); //Aqui compone el comando por tipo de metodo, nombre de la clase y acción si fuera necesario
                key = key.charAt(key.length-1) == " "? key.slice(0, -1) : key; 
                all_routes.push(key+additions);
                layer.route.stack[0].params = layer.route.path.replace('/', '').replace('/', '').split(":")[1];1
                routes[key] = layer.route.stack[0].handle;
            }
        });
    });
    global.ROUTES = all_routes;
    return routes;
};

module.exports = loadRoutes;