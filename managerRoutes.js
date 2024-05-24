const fs = require('fs');
const path = require('path');

const loadRoutes = (app) => {
    const routesPath = path.join(__dirname, 'routes');
    
    fs.readdirSync(routesPath).forEach(file => {
        if (file.endsWith('Routes.js')) {
            const route = require(path.join(routesPath, file));
            const routePath = `/api/${file.replace('Routes.js', '')}`;
            app.use(routePath, route);
            console.log(`Route loaded: ${routePath}`);
        }
    });
};

module.exports = loadRoutes;