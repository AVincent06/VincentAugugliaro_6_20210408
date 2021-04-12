/*******************************************************************************
 *  Nom         : auth.js
 *  Description : logique métier des routes
 *  Type        : JavaScript
 *  Auteur      : Vincent Augugliaro
 *  Version     : 0.3
 *  Création    : 07/04/2021
 *  Der. modif  : 12/04/2021
 *  Repository  : https://github.com/AVincent06/VincentAugugliaro_6_07042021
 *  Dépendances : 'bcrypt','jsonwebtoken','../models/auth'
 *******************************************************************************/

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Auth = require('../models/auth');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then((hash) => {
            const auth = new Auth({
                email : req.body.email,
                password : hash
            });
            auth.save()
                .then(() => res.status(201).json({ message : 'Utilisateur créé !' }))
                .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    Auth.findOne({ email : req.body.email })
        .then((auth) => {
            if(!auth) return res.status(401).json({ error : 'utilisateur non trouvé !'});
            bcrypt.compare(req.body.password, auth.password)
                .then((valid) => {
                    if(!valid) return res.status(401).json({ error : 'mot de passe incorrect !'});
                    res.status(200).json({
                        userId : auth._id,
                        token : jwt.sign(
                            { userId : auth._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn : '24h'}
                        )
                    });
                })
                .catch((error) => res.status(500).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
};