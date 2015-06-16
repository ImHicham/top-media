"use strict";

var YoutubeSource = require("./model/youtubeSource");

module.exports = {
	searchTweets: function searchTweets() {
		var instance = new YoutubeSource();
		instance.search().then(function (tweets) {
			return instance.filter(tweets);
		}).then(function (tweets) {
			return instance.transform(tweets);
		}).then(function (tweets) {
			return instance.save(tweets);
		});
	}
};
//# sourceMappingURL=controller.js.map