var YoutubeSource = require("./model/youtubeSource");

module.exports = {
	searchTweets () {
		let instance = new YoutubeSource();
  		instance.search().then((tweets) => { return instance.filter(tweets) }).then( tweets => { return instance.transform(tweets)} ).then( (tweets) => { return instance.save(tweets); } );
	}
}