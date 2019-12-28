const express = require('express');
mongoose = require('mongoose');

const router = express.Router();
const verifyJWTToken = require('../middlewares/auths').validateToken;
const { isProjectMember } = require('../middlewares/projectRole');
const { isAdmin } = require('../middlewares/projectRole');


const projectController = require('./../controllers/projectController');
const cardController = require('./../controllers/cardController');

router.route('/')
  .get(verifyJWTToken, projectController.getAll)
  .post(verifyJWTToken, projectController.post);

router.route('/:id')
  .get(verifyJWTToken, isProjectMember, projectController.getById)
  .put(verifyJWTToken, isProjectMember, projectController.UpdateProjectById)
  .delete(verifyJWTToken, isAdmin, projectController.deleteProjectById);

router.route('/:id/cards')
  .get(verifyJWTToken, isProjectMember, cardController.getCardsByProject)
  .post(verifyJWTToken, isProjectMember, cardController.post);

router.route('/:id/cards/:cardId')
  .get(verifyJWTToken, isProjectMember, cardController.getById)
  .put(verifyJWTToken, isProjectMember, cardController.UpdateCardById)
  .delete(verifyJWTToken, isProjectMember, cardController.deleteCardById);

module.exports = router;
