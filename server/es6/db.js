var Promise = require("bluebird");

var MongoClient = Promise.promisify(require('mongodb').MongoClient);



module.exports = {
	connect() {
		return new Promise((resolve,reject) => {
	         MongoClient.connect("mongodb://localhost:27017/topMedia", (err, db) => {
	             if(err !== null) return reject(err);
	             resolve(db);
	         });
	    });
	}
}