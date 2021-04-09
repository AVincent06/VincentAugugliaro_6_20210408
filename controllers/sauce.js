/*******************************************************************************
 *  Nom         : sauce.js
 *  Description : logique métier des routes
 *  Type        : JavaScript
 *  Auteur      : Vincent Augugliaro
 *  Version     : 0.2
 *  Création    : 07/04/2021
 *  Der. modif  : 09/04/2021
 *  Repository  : https://github.com/AVincent06/VincentAugugliaro_6_07042021
 *  Dépendances : 'body-parser','../models/sauce','fs'
 *******************************************************************************/

const { json } = require('body-parser');    // /!\/!\/!\ TROUVER SON ORIGINE OU EFFACER /!\/!\/!\
const Sauce = require('../models/sauce') //importation du modèle
const fs = require('fs');
const sauce = require('../models/sauce');   // /!\/!\/!\ TROUVER SON ORIGINE OU EFFACER /!\/!\/!\

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl : `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
        .then(() => res.status(201).json({ message : 'sauce enregistrée !'}))
        .catch((error) => res.status(400).json({ error })); //raccourci de {error : error}
};

exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ?
        {
            ...JSON.parse(req.body.sauce),
            imageUrl : `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
    Sauce.updateOne({ _id : req.params.id }, { ...sauceObject, _id : req.params.id })
    .then(() => res.status(200).json({ message : 'sauce modifiée !'}))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id : req.params.id })
        .then((sauce) => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({ _id : req.params.id })
                    .then(() => res.status(200).json({ message : 'sauce supprimée !'}))
                    .catch((error) => res.status(400).json({ error }));
            });
        })
        .catch((error) => res.status(500).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => res.status(200).json(sauce))
        .catch((error) => res.status(404).json({ error }));
};

exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then((sauces) => res.status(200).json(sauces))
        .catch((error) => res.status(400).json({ error }));
};