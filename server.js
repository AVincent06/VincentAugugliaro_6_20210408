/*******************************************************************************
 *  Nom         : server.js
 *  Description : point d'entrée du serveur backend
 *  Type        : JavaScript
 *  Auteur      : Vincent Augugliaro
 *  Version     : 0.2
 *  Création    : 07/04/2021
 *  Der. modif  : 17/04/2021
 *  Repository  : https://github.com/AVincent06/VincentAugugliaro_6_07042021
 *  Dépendances : 'http', './app'
 *******************************************************************************/

const http = require('http');   //import of the native Node http package
const app = require('./app');

/* returns a valid port */
const normalizePort = (val) => {
    const port = parseInt(val, 10);
    if(isNaN(port)) return val;
    if(port >= 0) return port;
    return false;
};
const port = normalizePort(process.env.PORT || process.env.APP_PORT);
app.set('port', port);

/* search, manage, record errors on the server */
const errorHandler = (error) => {
    if(error.syscall !== 'listen') throw error;
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch(error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.');
            process.exit(1);
            break;
        default:
            throw error;
    }
};

const server = http.createServer(app);  //server creation

/* event listener */
server.on('error', errorHandler);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
});

server.listen(port);    //listening to the server on a port