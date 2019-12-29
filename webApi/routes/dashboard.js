const express = require('express');
mongoose = require('mongoose');

const router = express.Router();
const verifyJWTToken = require('../middlewares/auths').validateToken;
const { isProjectMember } = require('../middlewares/projectRole');
const { isAdmin } = require('../middlewares/projectRole');

const dashboardController = require('./../controllers/dashboardController');

router.route('/')
.get(verifyJWTToken, dashboardController.get);

module.exports = router;