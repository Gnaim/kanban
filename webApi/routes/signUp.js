const express = require('express');
mongoose = require('mongoose');

const router = express.Router();
const signUpController = require('./../controllers/signUpController');

router.route('/')
  .post(signUpController.post);


module.exports = router;
