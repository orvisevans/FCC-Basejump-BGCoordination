'use strict';

var express = require('express'),
    routes = require('./app/routes/index.js'),
    mongo = require('mongodb').MongoClient;

var app = express();

mongo.connect('mongodb://localhost:27017/nightlifeApp', function (err, db) {

  if (err) {
    throw new Error('Database failed to connect!');
  } else {
    console.log('MongoDB successfully connected on port 27017.');
  }

  var path = process.cwd();

  app.use('/public', express.static(path + '/public'));
  app.use('/controllers', express.static(path + '/app/controllers'));

  routes(app, db);

  app.listen(3000, function () {
    console.log('Listening on port 3000...');
  });

});
