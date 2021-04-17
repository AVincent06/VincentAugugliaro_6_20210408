/*******************************************************************************
 *  Nom         : sauce.js
 *  Description : schéma de données strict
 *  Type        : JavaScript
 *  Auteur      : Vincent Augugliaro
 *  Version     : 0.3
 *  Création    : 07/04/2021
 *  Der. modif  : 17/04/2021
 *  Repository  : https://github.com/AVincent06/VincentAugugliaro_6_07042021
 *  Dépendances : 'mongoose'
 *******************************************************************************/

const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
    userId : { type : String, required : true },
    name : { type : String, required : true },
    manufacturer : { type : String, required : true },
    description : { type : String, required : true },
    mainPepper : { type : String, required : true },
    imageUrl : { type : String, required : true },
    heat : { type : Number, required : true },
    likes : { type : Number, required : true },
    dislikes : { type : Number, required : true },
    usersLiked : { type : [String], required : true },
    usersDisliked : { type : [String], required : true }
});

module.exports = mongoose.model('Sauce', sauceSchema);