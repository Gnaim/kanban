const express = require('express');
mongoose = require('mongoose');

const router = express.Router();
const verifyJWTToken = require('../middlewares/auths').validateToken;

const forgetPasswordController = require('./../controllers/forgetPasswordController');

router.route('/')
    .post(forgetPasswordController.postEmail);
router.route('/:token')
    .post(forgetPasswordController.resetPasswordRequest);


module.exports = router;