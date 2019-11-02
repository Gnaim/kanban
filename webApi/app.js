var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mailSender = require('./utils/mailSender')


// get keys from config.env
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

// model is where we store all the DB models, mongoose .
var db = require('./config/dataBaseConfig'),
    project = require('./models/project'),
    user = require('./models/user'),
    card = require('./models/card')
    checklist = require('./models/checklist');

var indexRouter = require('./routes/index');
var projectsRouter = require('./routes/projects');
var signUpRouter = require('./routes/signUp');
var loginRouter = require('./routes/login');


// module.exports = {
//     env: process.env.NODE_ENV,
//     serverPort: process.env.SERVER_PORT,
//     serverDb: process.env.SERVER_DB,
//     JWTSecret: process.env.JWT_SECRET,
// }
    
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/projects', projectsRouter);
app.use('/signUp', signUpRouter);
app.use('/login', loginRouter);


module.exports = app;
