const express = require('express');
mongoose = require('mongoose');

const router = express.Router();
const verifyJWTToken = require('../middlewares/auths').validateToken;


const userController = require('./../controllers/userController');

router.route('/')
  .get(verifyJWTToken, userController.getById)
  .put(verifyJWTToken, userController.UpdateUserById);

module.exports = router;
