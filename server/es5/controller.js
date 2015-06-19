"use strict";

var YoutubeSource = require("./model/youtubeSource");
var db = require("./db");

module.exports = {
	searchTweets: function searchTweets(req, res) {
		var instance = new YoutubeSource();
		instance.search().then(function (tweets) {
			return instance.filter(tweets);
		}).then(function (tweets) {
			return instance.transform(tweets);
		}).then(function (tweets) {
			return instance.save(tweets);
		}).then(function () {
			return res.sendStatus(200);
		});
	},

	findFromDB: function findFromDB(req, res) {
		console.log("getting videos");

		var options = req.query;
		var searchCriteria = {};

		//if contains 'best'
		if (/best/.test(options.sort)) {
			options.sort.push(["retweet_count", "desc"], ["favorite_count", "desc"]);
		}

		//if contains 'newest'
		if (/newest/.test(options.sort)) {
			options.sort.push(["scraped_at", "desc"]);
		};

		if (options.from && options.to) {
			searchCriteria.scraped_at = { $gte: options.from, $lte: options.to };
		};

		db.connect().then(function (db) {
			var collection = db.collection("post");
			collection.find(searchCriteria, options).toArray(function (err, data) {
				if (err) return err;
				res.json(data);
			});
		});
	}

};
//# sourceMappingURL=controller.js.map