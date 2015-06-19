var express = require('express');
var serveStatic = require('serve-static');
var moment = require("moment");
var path = require("path");



var app = express();

var CronJob = require('cron').CronJob;
var controller = require("./controller");

//execute every hour
var job = new CronJob('00 * * * *', controller.searchTweets, () => {
    console.log("cron executed at %s", new Date());
  },
  true /* Start the job right now */
);

app.use(express.static(path.join(__dirname, '../../client')));

//serve static html
app.get('/',  (req, res) => {
  	res.sendFile("index.html", { root: path.join(__dirname, '../../client') });
});

app.get('/search', controller.searchTweets);

app.get('/videos',  controller.findFromDB);

var server = app.listen(3000, () => {

  var host = server.address().address;
  var port = server.address().port;

  console.log('app listening at http://%s:%s', host, port);

});