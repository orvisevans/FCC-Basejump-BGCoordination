'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Going = new Schema({
        userId: String,
        businessId: String,
        date: Date
   }
);

module.exports = mongoose.model('Going', Going);
