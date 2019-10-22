var express = require('express');
mongoose = require('mongoose');
var router = express.Router();
const verifyJWTToken = require('../middlewares/auths').validateToken
const isProjectMember = require('../middlewares/projectRole').isProjectMember;

const projectController = require('./../controllers/projectController');

router.route('/')
.get(verifyJWTToken, projectController.getAll)
.post (verifyJWTToken, projectController.post)

router.route('/:id')
.get(verifyJWTToken, isProjectMember, projectController.getById);

module.exports = router;
