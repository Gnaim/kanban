var express = require('express');
mongoose = require('mongoose');
var router = express.Router();
const signUpController = require('./../controllers/signUpController');

router.route('/')
.post (signUpController.post)


module.exports = router;
