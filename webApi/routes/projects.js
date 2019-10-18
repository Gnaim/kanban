var express = require('express');
mongoose = require('mongoose');
var router = express.Router();
const projectController = require('./../controllers/projectController');

router.route('/')
.get(projectController.getAll)
.post (projectController.post)

router.route('/:id')
.get(projectController.getById);

module.exports = router;
