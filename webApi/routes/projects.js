var express = require('express');
mongoose = require('mongoose');
var router = express.Router();
const verifyJWTToken = require('../middlewares/auths').validateToken
const isProjectMember = require('../middlewares/projectRole').isProjectMember;

const projectController = require('./../controllers/projectController');
const cardController = require('./../controllers/cardController');

router.route('/')
.get(verifyJWTToken, projectController.getAll)
.post (verifyJWTToken, projectController.post)

router.route('/:id')
.get(verifyJWTToken, isProjectMember, projectController.getById)
.put(verifyJWTToken, isProjectMember, projectController.UpdateProjectById)

router.route('/:id/cards')
.get(verifyJWTToken, isProjectMember, cardController.getCardsByProject)
.post(verifyJWTToken, isProjectMember, cardController.post);

router.route('/:id/cards/:cardId')
.get(verifyJWTToken, isProjectMember, cardController.getById)
.put(verifyJWTToken, isProjectMember, cardController.UpdateCardById);

module.exports = router;
