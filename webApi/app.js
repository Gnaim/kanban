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
const card = require('./models/card');
const project = require('./models/project');
const user = require('./models/user');
checklist = require('./models/checklist');
const invitations = require('./models/invitations');
const resetPwd = require('./models/resetPwd');

const indexRouter = require('./routes/index');
const projectsRouter = require('./routes/projects');
const signUpRouter = require('./routes/signUp');
const loginRouter = require('./routes/login');
const userRouter = require('./routes/user');
const dashboardRouter = require('./routes/dashboard');
const forgetPasswordRouter = require('./routes/forgetPassword');

var cors = require('cors');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use('/profilePicture',express.static("profilePicture"))
app.use('/', indexRouter);
app.use('/projects', projectsRouter);
app.use('/signUp', signUpRouter);
app.use('/login', loginRouter);
app.use('/user', userRouter);
app.use('/dashboard', dashboardRouter);
app.use('/forgetPassword', forgetPasswordRouter);


module.exports = app;
