"use strict";

var Promise = require("bluebird");

var MongoClient = Promise.promisify(require("mongodb").MongoClient);

module.exports = {
	connect: function connect() {
		return new Promise(function (resolve, reject) {
			MongoClient.connect("mongodb://localhost:27017/topMedia", function (err, db) {
				if (err !== null) return reject(err);
				resolve(db);
			});
		});
	}
};
//# sourceMappingURL=db.js.map