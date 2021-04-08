/*******************************************************************************
 *  Nom         : stuff.js
 *  Description : routes 
 *  Type        : JavaScript
 *  Auteur      : Vincent Augugliaro
 *  Version     : 0.1
 *  Création    : 07/04/2021
 *  Der. modif  : 07/04/2021
 *  Repository  : https://github.com/AVincent06/VincentAugugliaro_6_07042021
 *  Dépendances : 'express','../controllers/stuff','../middleware/auth','../middleware/multer-config'
 *******************************************************************************/

const express = require('express');
const router = express.Router();

const stuffCtrl = require('../controllers/stuff');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/', auth, multer, stuffCtrl.createThing);
router.put('/:id', auth, multer, stuffCtrl.modifyThing);
router.delete('/:id', auth, stuffCtrl.deleteThing);
router.get('/:id', auth, stuffCtrl.getOneThing);
router.get('/', auth, stuffCtrl.getAllThings);

module.exports = router;