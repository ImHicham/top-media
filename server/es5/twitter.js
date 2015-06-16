'use strict';

var Twitter = require('twitter');

var config = require('../config');

var client = new Twitter({
  consumer_key: config.twitter.consumer_key,
  consumer_secret: config.twitter.consumer_secret,
  access_token_key: config.twitter.access_token_key,
  access_token_secret: config.twitter.access_token_secret
});

var params = { q: 'youtube', include_entities: true, result_type: 'popular' };

client.get('https://api.twitter.com/1.1/search/tweets.json', params, function (error, tweets, response) {
  if (!error) {
    console.log(tweets);
  } else {
    console.log('error');
  }
});
//# sourceMappingURL=twitter.js.map