const express = require('express');
mongoose = require('mongoose');

const router = express.Router();

const confirmationUsersController = require('./../controllers/confirmationUsersController');


router.route('/:token')
    .get(confirmationUsersController.confirmMail);


module.exports = router;