/*******************************************************************************
 *  Nom         : auth.js
 *  Description : logique métier des routes
 *  Type        : JavaScript
 *  Auteur      : Vincent Augugliaro
 *  Version     : 0.3
 *  Création    : 07/04/2021
 *  Der. modif  : 15/04/2021
 *  Repository  : https://github.com/AVincent06/VincentAugugliaro_6_07042021
 *  Dépendances : 'bcrypt','jsonwebtoken','../models/auth'
 *******************************************************************************/

/* Importation des middlewares relatifs à la SECURITE */
const passwordValidator = require('password-validator');//A2:2017
const bcrypt = require('bcrypt');                       //A2:2017

const jwt = require('jsonwebtoken');

const Auth = require('../models/auth');

/* Création d'un schéma pour le password */
const schema = new passwordValidator();
schema
    .is().min(12)
    .is().max(64)
    .has().uppercase()
    .has().lowercase()
    .has().digits()
    .has().not().spaces();

exports.signup = (req, res, next) => {
    if(schema.validate(req.body.password)) {
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
    }else{
        res.status(500).json({ error : 'mot de passe refusé !' });
    }
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