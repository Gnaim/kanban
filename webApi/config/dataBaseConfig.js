var mongoose = require('mongoose');
var dataBaseUserName = process.env.USERNAME_DB;
var dataBasePassword = process.env.PASSWORD_DB;

const uri = `mongodb+srv://${dataBaseUserName}:${dataBasePassword}@cluster0-0ttpj.gcp.mongodb.net/test?retryWrites=true&w=majority`;


mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true } );
