const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv');
const mailSender = require('./utils/mailSender');


// get keys from config.env

dotenv.config({ path: './config.env' });

// model is where we store all the DB models, mongoose .
const db = require('./config/dataBaseConfig');
const project = require('./models/project');
const user = require('./models/user');
const card = require('./models/card');
checklist = require('./models/checklist');

const indexRouter = require('./routes/index');
const projectsRouter = require('./routes/projects');
const signUpRouter = require('./routes/signUp');
const loginRouter = require('./routes/login');


// module.exports = {
//     env: process.env.NODE_ENV,
//     serverPort: process.env.SERVER_PORT,
//     serverDb: process.env.SERVER_DB,
//     JWTSecret: process.env.JWT_SECRET,
// }

const app = express();

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
