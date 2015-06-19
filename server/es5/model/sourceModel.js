"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Twitter = require("twitter");
var Promise = require("bluebird");

var config = require("../config");

var client = new Twitter({
	consumer_key: config.twitter.consumer_key,
	consumer_secret: config.twitter.consumer_secret,
	access_token_key: config.twitter.access_token_key,
	access_token_secret: config.twitter.access_token_secret
});

var SourceModel = (function () {
	function SourceModel() {
		var params = arguments[0] === undefined ? {} : arguments[0];

		_classCallCheck(this, SourceModel);

		this.sourceApi = client;
		this.params = params;
		this.searchUrl = "https://api.twitter.com/1.1/search/tweets.json";
		this.db = require("../db");
	}

	_createClass(SourceModel, [{
		key: "search",

		//returns a promise
		value: function search() {
			var _this = this;

			return new Promise(function (resolve, reject) {
				_this.sourceApi.get(_this.searchUrl, _this.params, function (err, data) {
					if (err !== null) return reject(err);
					resolve(data);
				});
			});
		}
	}, {
		key: "filter",

		//filter the result
		value: function filter() {}
	}, {
		key: "transform",

		//transform the result
		value: function transform() {}
	}, {
		key: "save",

		//save to DB
		value: function save() {}
	}]);

	return SourceModel;
})();

module.exports = SourceModel;
//# sourceMappingURL=../model/sourceModel.js.map