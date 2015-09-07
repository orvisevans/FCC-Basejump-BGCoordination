'use strict';

var express = require('express'),
    routes = require('./app/routes/index.js'),
    mongoose = require('mongoose');

var app = express();

mongoose.connect('mongodb://localhost:27017/nightlifeApp');

var path = process.cwd();

app.use('/public', express.static(path + '/public'));
app.use('/controllers', express.static(path + '/app/controllers'));

routes(app);

var port = 3000;
app.listen(port, function () {
  console.log('Listening on port ' + port + '...');
});
