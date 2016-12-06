// Get the packages we need
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var morgan = require('morgan');
var passport = require('passport');
var secrets = require('./config/secrets'); // get db config file
var cookieParser = require('cookie-parser');


// var User        = require('./app/models/user'); // get the mongoose model
var jwt = require('jwt-simple');

// Create our Express application
var app = express();

app.use(express.static(__dirname + '/public'));

// Use environment defined port or user-defined
var port = process.env.PORT || 4000;

//Allow CORS so that backend and frontend can be put on different servers
var allowCrossDomain = function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Origin", "http://localhost:3000, http://localhost:4000");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    // res.header("Access-Control-Allow-Credentials", true);
    next();
};
app.use(allowCrossDomain);

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

//log to console
app.use(morgan('dev'));

//use passport
app.use(passport.initialize());

app.use(cookieParser(secrets.secret));

// Use routes as a module (see index.js)
require('./routes')(app, router);

// Start the server
app.listen(port);
console.log('Server running on port ' + port);

mongoose.connect('mongodb://kale:idontremember@ds161487.mlab.com:61487/kaledb');
// .then(console.log('connection succesful'))
// .catch(console.log('connection error'));
