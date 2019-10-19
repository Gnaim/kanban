var express = require('express');
mongoose = require('mongoose');
var router = express.Router();
const verifyJWTToken = require('../libs/auths').validateToken

const projectController = require('./../controllers/projectController');

router.route('/')
.get(verifyJWTToken, projectController.getAll)
.post (verifyJWTToken, projectController.post)

router.route('/:id')
.get(verifyJWTToken, projectController.getById);

module.exports = router;
