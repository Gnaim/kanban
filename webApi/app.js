var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var projectsRouter = require('./routes/projects');

// model is where we store all the DB models, mongoose .
var db = require('./models/dataBase'),
    project = require('./models/project');   // create dataBase Schema;

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/projects', projectsRouter);

module.exports = app;
