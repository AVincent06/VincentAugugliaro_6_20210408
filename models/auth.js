/*******************************************************************************
 *  Nom         : user.js
 *  Description : schéma de données strict
 *  Type        : JavaScript
 *  Auteur      : Vincent Augugliaro
 *  Version     : 0.1
 *  Création    : 07/04/2021
 *  Der. modif  : 09/04/2021
 *  Repository  : https://github.com/AVincent06/VincentAugugliaro_6_07042021
 *  Dépendances : 'mongoose','mongoose-unique-validator'
 *******************************************************************************/

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email : { type : String, required : true, unique : true },
    password : { type : String, required : true }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);