// connection to the mongoDb data base
var mongoose = require('mongoose');

// url for the dataBase will be replaced by cloud dataBase
mongoose.connect('mongodb://localhost/trelloDb', { useNewUrlParser: true, useUnifiedTopology: true } );
