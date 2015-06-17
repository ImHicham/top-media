var YoutubeSource = require("./model/youtubeSource");

module.exports = {
	searchTweets () {
		let instance = new YoutubeSource();
  		instance.search().then( tweets => instance.filter(tweets) ).then( tweets => instance.transform(tweets) ).then( tweets => instance.save(tweets) );
	}
}