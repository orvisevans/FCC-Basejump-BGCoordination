'use strict';

var Goings = require('../models/goings.js');

function goingsHandler () {

  this.getGoings = function (req, res) {
    Goings
      .find({date: req.params.date})
      .exec(function (err, results) {
        if (err) {throw err;}
        res.json(results);
      });
  };

  this.createGoing = function (req, res) {
    var newDoc = new Goings({
            userId: req.params.userId,
            businessId: req.params.businessId,
            date: req.params.date
          });
    newDoc.save(function (err, doc) {
      if (err) {throw err;}
      res.json([newDoc]);
    });
  };

  this.deleteGoing = function (req, res) {
    Goings
      .remove({
        userId: req.params.userId,
        businessId: req.params.businessId,
        date: req.params.date
      }, function (err, result) {
        if (err) {throw err;}
      })
  }
}

module.exports = goingsHandler;
