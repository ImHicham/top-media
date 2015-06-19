"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var moment = require("moment");
var SourceModel = require("./SourceModel");
var utils = require("../utils");

var params = { q: "youtube since:" + moment().format("YYYY-MM-DD"), include_entities: true, result_type: "popular" };

var YoutubeSource = (function (_SourceModel) {
	function YoutubeSource() {
		_classCallCheck(this, YoutubeSource);

		_get(Object.getPrototypeOf(YoutubeSource.prototype), "constructor", this).call(this, params);
	}

	_inherits(YoutubeSource, _SourceModel);

	_createClass(YoutubeSource, [{
		key: "search",
		value: function search() {
			console.log("searching from YoutubeSource");
			return _get(Object.getPrototypeOf(YoutubeSource.prototype), "search", this).call(this);
		}
	}, {
		key: "filter",
		value: function filter(tweets) {
			console.log("filtering %s tweets", tweets.statuses.length);

			var filteredTweets = tweets.statuses.filter(function (tweet) {

				var urls = tweet.entities.urls;

				for (var i = 0; i < urls.length; i++) {
					var url = urls[i].expanded_url;
					if (/youtu(\.)?be/.test(url)) {
						tweet.entities.url = url;
						return true;
					}
				}
				return false;
			});

			return filteredTweets;
		}
	}, {
		key: "transform",
		value: function transform(tweets) {
			var result = tweets.map(function (tweet) {
				var url = tweet.entities.url;
				if (/youtu(\.)?be/.test(url)) {
					url = utils.getYoutubeID(url);
				}
				return { tweet_id: tweet.id, text: tweet.text, created_at: new Date(tweet.created_at), scraped_at: new Date(), retweet_count: tweet.retweet_count, favorite_count: tweet.favorite_count, video_id: url };
			});

			return result;
		}
	}, {
		key: "save",
		value: function save(filteredTweets) {
			console.log("saving...");
			if (filteredTweets.length != 0) {

				this.db.connect().then(function (db) {
					var collection = db.collection("post");
					console.log("Connected correctly to server");

					filteredTweets.forEach(function (tweet) {
						collection.update({ video_id: tweet.video_id }, tweet, { upsert: true }, function (err, result) {
							if (err) return err;
							console.log("inserted %s documents", result.result.n);
							db.close();
						});
					});
				});
			}
		}
	}]);

	return YoutubeSource;
})(SourceModel);

module.exports = YoutubeSource;
//# sourceMappingURL=../model/youtubeSource.js.map