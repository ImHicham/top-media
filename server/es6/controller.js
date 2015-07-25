var YoutubeSource = require("./model/youtubeSource");
var db = require("./db");




module.exports = {
	searchTweets (req, res) {
		let instance = new YoutubeSource();
  		instance.search()
  			.then( tweets => instance.filter(tweets) )
  			.then( tweets => instance.transform(tweets) )
  			.then( tweets => instance.save(tweets) )
  			.then( () => res.sendStatus(200) );
	},

	findFromDB (req, res) {
		console.log("getting videos");

	    let params = req.query;
	    let searchCriteria = {};
	    let projection = {};
	    let options = {
	    	"skip": params.skip,
	    	"limit": params.limit,
	    	"sort": []
	    };
	    //if contains 'best'
	    if ( /best/.test(params.sort) ) {
	      options.sort.push(["retweet_count", "desc"]);
	      options.sort.push(["favorite_count", "desc"]);
	    }
	    //if contains 'newest'
	    if ( /newest/.test(params.sort) ) {
	    	options.sort.push(["scraped_at", "desc"]);
	    };

	    if (params.from && params.to) {
	    	searchCriteria.scraped_at = {$gte :  params.from, $lte : params.to};
	    };
	    db.connect().then( db => {
	      var collection = db.collection("post");
	      collection.find(searchCriteria, projection, options).toArray(function (err, data) {
	        if (err)
	          return err;
	        res.json(data);
	      });
	    });
	}

}
