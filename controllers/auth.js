/*******************************************************************************
 *  Nom         : auth.js
 *  Description : logique métier des routes
 *  Type        : JavaScript
 *  Auteur      : Vincent Augugliaro
 *  Version     : 0.5
 *  Création    : 07/04/2021
 *  Der. modif  : 17/04/2021
 *  Repository  : https://github.com/AVincent06/VincentAugugliaro_6_07042021
 *  Dépendances : 'password-validator','bcrypt','jsonwebtoken','../models/auth','dotenv'
 *******************************************************************************/

 require('dotenv').config();

/* Import of SECURITY-related middleware */
const passwordValidator = require('password-validator');//A2:2017 OWASP
const bcrypt = require('bcrypt');                       //A2:2017 OWASP

const emailValidator = require("email-validator");
const jwt = require('jsonwebtoken');

const Auth = require('../models/auth');

/* Creating a scheme for the password */
const schema = new passwordValidator();
schema
    .is().min(12)
    .is().max(64)
    .has().uppercase()
    .has().lowercase()
    .has().digits()
    .has().not().spaces();

exports.signup = (req, res, next) => {
    const emailValidated = emailValidator.validate(req.body.email);
    const passwordValidated = schema.validate(req.body.password);
    
    let feedback1 = '';
    let feedback2 = '';
    if(!emailValidated) feedback1 = 'Format email non valide. ';
    if(!passwordValidated) feedback2 = 'Pour valider le password il faut entre 12 et 64 caractères sans espace et au moins une majuscule, une minuscule et un chiffre';

    if(emailValidated && passwordValidated) {
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
        res.status(500).json({ error : feedback1+feedback2 });
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
                            process.env.TOKEN_KEY,
                            { expiresIn : process.env.TOKEN_DURATION }
                        )
                    });
                })
                .catch((error) => res.status(500).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
};