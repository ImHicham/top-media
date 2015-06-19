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

	    let options = req.query;
	    let searchCriteria = {};

	    //if contains 'best'
	    if ( /best/.test(options.sort) ) {
	      options.sort.push(['retweet_count','desc'], ['favorite_count','desc']);
	    }

	    //if contains 'newest'
	    if ( /newest/.test(options.sort) ) {
	    	options.sort.push(['scraped_at','desc']);
	    };

	    if (options.from && options.to) {
	    	searchCriteria.scraped_at = {$gte :  options.from, $lte : options.to};
	    };

	    db.connect().then( db => {
	      var collection = db.collection("post");
	      collection.find(searchCriteria, options).toArray(function (err, data) {
	        if (err) 
	          return err;
	        res.json(data);
	      });
	    });
	}

}