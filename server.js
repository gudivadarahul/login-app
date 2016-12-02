// server.js set up
// GET TOOLS
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 27017; //Port choice! :)
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var configDB = require('./config/database.js');

// configure and connect to database
mongoose.connect(configDB.url);

require('./config/passport.js')(passport); // this is passport lib configurations

// Setup express app. and middle ware
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // Cookies for authentication (not really needed)
app.use(bodyParser.json()); //very important to acces all json info from strings in htlml forms
app.use(bodyParser.urlencoded({ extended: true }));

//ejs tempelate setup
app.set('view engine', 'ejs');

// required for passport
app.use(session({
    secret: 'bpaphsgods', // session secret
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); // use connect-flash for flash messages stored in session (basically testing)

// load our routes
require('./app/routes.js')(app, passport);

// launch (Finally...)
app.listen(port);
console.log('And the winners are... ' + port);
