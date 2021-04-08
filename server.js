/*******************************************************************************
 *  Nom         : server.js
 *  Description : point d'entrée du serveur backend
 *  Type        : JavaScript
 *  Auteur      : Vincent Augugliaro
 *  Version     : 0.1
 *  Création    : 07/04/2021
 *  Der. modif  : 07/04/2021
 *  Repository  : https://github.com/AVincent06/VincentAugugliaro_6_07042021
 *  Dépendances : 'http', './app'
 *******************************************************************************/

const http = require('http');   //import du package http natif de Node
const app = require('./app');

/* renvoie un port valide */
const normalizePort = (val) => {
    const port = parseInt(val, 10);
    if(isNaN(port)) return val;
    if(port >= 0) return port;
    return false;
};
const port = normalizePort(process.env.PORT || process.env.APP_PORT);
app.set('port', port);

/* recherche, gère, enregistre les erreurs sur le serveur */
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

const server = http.createServer(app);  //création du serveur

/* écouteur d'évènement */
server.on('error', errorHandler);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
});

server.listen(port);    //écoute du serveur sur un port