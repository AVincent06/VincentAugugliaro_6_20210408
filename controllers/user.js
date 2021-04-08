/*******************************************************************************
 *  Nom         : user.js
 *  Description : logique métier des routes
 *  Type        : JavaScript
 *  Auteur      : Vincent Augugliaro
 *  Version     : 0.1
 *  Création    : 07/04/2021
 *  Der. modif  : 07/04/2021
 *  Repository  : https://github.com/AVincent06/VincentAugugliaro_6_07042021
 *  Dépendances : 'bcrypt','jsonwebtoken','../models/user'
 *******************************************************************************/

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then((hash) => {
            const user = new User({
                email : req.body.email,
                password : hash
            });
            user.save()
                .then(() => res.status(201).json({ message : 'Utilisateur créé !' }))
                .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    User.findOne({ email : req.body.email })
        .then((user) => {
            if(!user) return res.status(401).json({ error : 'utilisateur non trouvé !'});
            bcrypt.compare(req.body.password, user.password)
                .then((valid) => {
                    if(!valid) return res.status(401).json({ error : 'mot de passe incorrect !'});
                    res.status(200).json({
                        userId : user._id,
                        token : jwt.sign(
                            { userId : user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn : '24h'}
                        )
                    });
                })
                .catch((error) => res.status(500).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
};