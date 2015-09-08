'use strict';

var express = require('express'),
    routes = require('./app/routes/index.js'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    session = require('express-session');

var app = express();
require('./app/config/passport')(passport);

mongoose.connect('mongodb://localhost:27017/nightlifeApp');

var path = process.cwd();

app.use('/public', express.static(path + '/public'));
app.use('/controllers', express.static(path + '/app/controllers'));

app.use(session({
  secret: 'secretBGMeet',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

routes(app, passport);

var port = 3000;
app.listen(port, function () {
  console.log('Listening on port ' + port + '...');
});
