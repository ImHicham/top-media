let moment = require("moment");
let SourceModel = require("./SourceModel");
let utils = require("../utils");

let params = {q: 'youtube since:' + moment().format("YYYY-MM-DD"), include_entities: true, result_type: "popular"};

class YoutubeSource extends SourceModel {

	constructor () {
		super(params);
	}
	search() {
		console.log("searching from YoutubeSource");
		
		return super.search();

	}
	filter(tweets) {
		console.log("filtering %s tweets", tweets.statuses.length);

		let filteredTweets = tweets.statuses.filter( (tweet) => {

			let urls = tweet.entities.urls;

			for (let i = 0; i < urls.length; i++) {
			  let url = urls[i].expanded_url;
			  if( /youtu(\.)?be/.test(url) ) {
			  	tweet.entities.url = url;
			  	return true;
			  }
			}
			return false;
	    });

		return filteredTweets;
	}

	transform (tweets) {
		let result = tweets.map( (tweet) => {
			var url = tweet.entities.url;
			if ( /youtu(\.)?be/.test(url) ) {
				url = utils.getYoutubeID(url);
			}
		  	return {tweet_id: tweet.id, text: tweet.text, created_at: new Date(tweet.created_at), scraped_at: new Date(), retweet_count: tweet.retweet_count , favorite_count: tweet.favorite_count,video_id: url};
		});

		return result;
	}

	 save (filteredTweets) {
	 	console.log("saving...");
	 	if (filteredTweets.length != 0) {
	 		
	 		this.db.connect().then( db => {
	 			var collection = db.collection('post');		
			  console.log("Connected correctly to server");
			  	collection.insert(filteredTweets, (err, result) => {
				  	if (err) return err;
				  	console.log("inserted %s documents", result.result.n);
				  	db.close();
			  	});
	 		});

	 	}
		

	}

}
module.exports = YoutubeSource;