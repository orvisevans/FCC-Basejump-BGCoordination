"use strict";

/* require the modules needed */
var oauthSignature = require('oauth-signature');
var n = require('nonce')();
var request = require('request');
var qs = require('querystring');
var _ = require('lodash');
var yelpAuth;
try {
  yelpAuth = require('../config/auth').yelpAuth;
} catch (err) {
  console.log(err);
  yelpAuth = {
    consumerSecret: process.env.YELP_CONSUMER_SECRET,
    tokenSecret: process.env.YELP_TOKEN_SECRET
  }
}

/* Function for yelp call
 * ------------------------
 * setParameters: object with params to search
 * callback: callback(error, response, body)
 */
function requestYelp(setParameters, callback) {
  var httpMethod = 'GET';
  var url = 'http://api.yelp.com/v2/search';
  var defaultParameters = {
    location: 'Portland, Or',
    sort: '2'
  };
  var requiredParameters = {
    'oauth_consumer_key' : 'spjsp8qL3YgxLcaPWzAppw',
    'oauth_token' : 'ioF2T6MHr82Sr1ND0ZWeFZgytQGv3ug3',
    'oauth_nonce' : n(),
    'oauth_timestamp' : n().toString().substr(0,10),
    'oauth_signature_method' : 'HMAC-SHA1',
    'oauth_version' : '1.0'
  };

  /* We combine all the parameters in order of importance */
  var parameters = _.assign(defaultParameters, setParameters, requiredParameters);

  /* We set our secrets here */
  var consumerSecret = yelpAuth.consumerSecret;
  var tokenSecret = yelpAuth.tokenSecret;

  /* Then we call Yelp's Oauth 1.0a server, and it returns a signature */
  /* Note: This signature is only good for 300 seconds after the oauth_timestamp */
  var signature = oauthSignature.generate(httpMethod, url, parameters, consumerSecret, tokenSecret, { encodeSignature: false});
  parameters.oauth_signature = signature;

  /* Then we turn the paramters object, to a query string */
  var paramURL = qs.stringify(parameters);
  var apiURL = url+'?'+paramURL;

  /* Then we use request to send make the API Request */
  request(apiURL, function(error, response, body){
    return callback(error, response, body);
  });
}

function yelpHandler() {
  //search yelp for a location
  this.search = function(req, res) {
    requestYelp({location: req.params.location}, function(err, response, body) {
      return res.status(200).json(body);
    });
  };
}

module.exports = yelpHandler;
