'use strict'

var path = process.cwd();

var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');
var YelpSearchHandler = require(path + '/app/controllers/yelpSearchHandler.server.js');
var GoingsHandler = require(path + '/app/controllers/goingHandler.server.js');

module.exports = function(app, passport) {

  function isLoggedIn (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect('/login');
    }
  }

  var clickHandler = new ClickHandler();
  var yelpSearchHandler = new YelpSearchHandler();
  var goingsHandler = new GoingsHandler();

  app.route('/')
    .get(function (req, res) {
      res.sendFile(path + '/public/index.html');
    });

  app.route('/login')
    .get(function (req, res) {
      res.sendFile(path + '/public/login.html');
    });

  app.route('/logout')
    .get(function (req, res) {
      req.logout();
      res.redirect('/login');
    });

  app.route('/profile')
    .get(isLoggedIn, function (req, res) {
      res.sendFile(path + '/public/profile.html');
    });

  app.route('/api/user')
    .get(isLoggedIn, function(req, res) {
      res.json(req.user.twitter);
    });

  app.route('/api/user/isLoggedIn')
    .get(isLoggedIn, function(req, res) {
      res.send('true');
    });

  app.route('/auth/twitter')
    .get(passport.authenticate('twitter'));

  app.route('/auth/twitter/callback')
    .get(passport.authenticate('twitter', {
      successRedirect: '/',
      failureRedirect: '/login'
    }));

  app.route('/api/clicks')
    .get(clickHandler.getClicks)
    .post(clickHandler.addClick)
    .delete(clickHandler.resetClicks);

  app.route('/api/yelp/:location')
    .get(yelpSearchHandler.search);

  app.route('/api/goings/:date')
    .get(goingsHandler.getGoings);

  app.route('/api/goings/:date/:businessId/:userId')
    .post(isLoggedIn, goingsHandler.createGoing)
    .delete(isLoggedIn, goingsHandler.deleteGoing);
};
