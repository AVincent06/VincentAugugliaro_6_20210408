/*******************************************************************************
 *  Nom         : auth.js
 *  Description : schéma de données strict
 *  Type        : JavaScript
 *  Auteur      : Vincent Augugliaro
 *  Version     : 0.2
 *  Création    : 07/04/2021
 *  Der. modif  : 09/04/2021
 *  Repository  : https://github.com/AVincent06/VincentAugugliaro_6_07042021
 *  Dépendances : 'mongoose','mongoose-unique-validator'
 *******************************************************************************/

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const authSchema = mongoose.Schema({
    //authId : { type : String, required : true},
    email : { type : String, required : true, unique : true },
    password : { type : String, required : true }
});

authSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Auth', authSchema);