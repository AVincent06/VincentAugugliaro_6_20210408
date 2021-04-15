/*******************************************************************************
 *  Nom         : app.js
 *  Description : framework Express
 *  Type        : JavaScript
 *  Auteur      : Vincent Augugliaro
 *  Version     : 0.3
 *  Création    : 07/04/2021
 *  Der. modif  : 15/04/2021
 *  Repository  : https://github.com/AVincent06/VincentAugugliaro_6_07042021
 *  Dépendances : 'express','body-parser','mongoose','path','./routes/sauce','./routes/auth'
 *                'helmet' 
*******************************************************************************/

require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

/* Importation des middlewares relatifs à la SECURITE */
const helmet = require('helmet');                       //A7:2017
/* - */

const sauceRoutes = require('./routes/sauce');
const authRoutes = require('./routes/auth');

const app = express();
app.use(helmet());

/* Connexion à la BDD */
mongoose.connect('mongodb+srv://'+ process.env.DB_USER +':'+ process.env.DB_PASSWORD +'@cluster0.3ndcv.mongodb.net/'+ process.env.DB_NAME +'?retryWrites=true&w=majority', {
    useNewUrlParser : true,
    useUnifiedTopology : true
})
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

/* Cross Origin Resource Sharing (CORS) */
app.use((req, res, next) => {   //s'applique à toutes les routes
    res.setHeader('Access-Control-Allow-Origin', '*');  //origine de l'accès
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');    //les headers autorisés
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');    //les méthodes autorisés
    next();
});

app.use(bodyParser.json());    // extrait l'objet JSON de la demande

app.use('/images', express.static(path.join(__dirname, 'images')));

/* routes */
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', authRoutes);

module.exports = app;