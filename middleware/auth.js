/*******************************************************************************
 *  Nom         : auth.js
 *  Description : middleware d'authentification
 *  Type        : JavaScript
 *  Auteur      : Vincent Augugliaro
 *  Version     : 0.1
 *  Création    : 07/04/2021
 *  Der. modif  : 09/04/2021
 *  Repository  : https://github.com/AVincent06/VincentAugugliaro_6_07042021
 *  Dépendances : 'jsonwebtoken'
 *******************************************************************************/

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const authId = decodedToken.authId;
        if(req.body.authId && req.body.authId !== authId) {
            throw 'Auth ID non valable !';
        } else {
            next();
        }
    } catch(error) {
        res.status(401).json({ error : error | 'Requête non authentifiée !'});
    }
};