/*******************************************************************************
 *  Nom         : sauce.js
 *  Description : logique métier des routes
 *  Type        : JavaScript
 *  Auteur      : Vincent Augugliaro
 *  Version     : 0.3
 *  Création    : 07/04/2021
 *  Der. modif  : 13/04/2021
 *  Repository  : https://github.com/AVincent06/VincentAugugliaro_6_07042021
 *  Dépendances : 'body-parser','../models/sauce','fs'
 *******************************************************************************/

const { json } = require('body-parser');    // /!\/!\/!\ TROUVER SON ORIGINE OU EFFACER /!\/!\/!\
const Sauce = require('../models/sauce');   //importation du modèle
const fs = require('fs');
const sauce = require('../models/sauce');   // /!\/!\/!\ TROUVER SON ORIGINE OU EFFACER /!\/!\/!\

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl : `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes : 0,
        dislikes : 0,
        usersLiked : [],
        usersDisliked : []
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

exports.likeSauce = (req, res, next) => {
    const notFound  = -1;
    const like      = 1;
    const dislike   = -1;
    
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
            /* On controle que l'utilisateur ne soit pas le créateur de la sauce 
            if(sauce.userId == req.body.userId) {
                res.status(205).json({message : 'like/dislike désactivée pour le créateur de la sauce'});   //403?
                return;
            }*/

            const indexInDisliked = sauce.usersDisliked.indexOf(req.body.userId);
            const indexInLiked = sauce.usersLiked.indexOf(req.body.userId);
            switch(req.body.like) {
                case like :
                    if(indexInDisliked > notFound) {
                        sauce.usersDisliked.splice(indexInDisliked, 1);
                        sauce.dislikes = sauce.usersDisliked.length;
                    }
                    if(indexInLiked == notFound) sauce.likes = sauce.usersLiked.push(req.body.userId);
                    break;
                case dislike :
                    if(indexInLiked > notFound) {
                        sauce.usersLiked.splice(indexInLiked, 1);
                        sauce.likes = sauce.usersLiked.length;
                    }
                    if(indexInDisliked == notFound) sauce.dislikes = sauce.usersDisliked.push(req.body.userId);
                    break;
                default : //retour initial
                    if(indexInDisliked > notFound) {    //l'utilisateur enlève son dislike
                        sauce.usersDisliked.splice(indexInDisliked, 1);
                        sauce.dislikes = sauce.usersDisliked.length;
                    } else {                            //l'utilisateur enlève son like
                        sauce.usersLiked.splice(indexInLiked, 1);
                        sauce.likes = sauce.usersLiked.length;
                    }
            }

            sauce.save()
                .then(() => res.status(201).json({ message : 'like/dislike sauvegardée'}))
                .catch((error) => res.status(400).json({ error })); //raccourci de {error : error}
            
        })
        .catch((error) => res.status(404).json({ error }));
};