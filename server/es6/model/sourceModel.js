let Twitter = require('twitter');
let Promise = require("bluebird");

let config = require("../config");

let client = new Twitter({
  consumer_key: config.twitter.consumer_key,
  consumer_secret: config.twitter.consumer_secret,
  access_token_key: config.twitter.access_token_key,
  access_token_secret: config.twitter.access_token_secret
});


 
class SourceModel {
	constructor (params = {}) {
		this.sourceApi = client;
		this.params = params;
		this.searchUrl = "https://api.twitter.com/1.1/search/tweets.json";
		this.db = require("../db");
	}
	//returns a promise
	search () {
		//return this.clientTwitter.get(this.params);
		return new Promise((resolve,reject) => {
	         this.sourceApi.get(this.searchUrl, this.params, (err, data) => {
	             if(err !== null) return reject(err);
	             resolve(data);
	         });
	    });
	}
	//filter the result
	filter () {}
	//transform the result
	transform () {}
	//save to DB
	save () {}
}

module.exports = SourceModel;
