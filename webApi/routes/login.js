const express = require('express');
mongoose = require('mongoose');

const router = express.Router();
const loginController = require('./../controllers/loginController');

router.route('/')
  .post(loginController.login);

module.exports = router;
