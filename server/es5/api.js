'use strict';

var express = require('express');
var serveStatic = require('serve-static');
var moment = require('moment');
var path = require('path');

var db = require('./db');

var app = express();

var CronJob = require('cron').CronJob;
var controller = require('./controller');

var job = new CronJob('00 * * * *', controller.searchTweets, function () {
  console.log('cron executed at %s', new Date());
}, true /* Start the job right now */
);

app.use(express['static'](path.join(__dirname, '../../client')));

app.get('/', function (req, res) {
  res.sendFile('index.html', { root: path.join(__dirname, '../../client') });
});

app.get('/searc', function (req, res) {
  controller.searchTweets();
});

app.get('/videos', function (req, res) {
  console.log('getting videos');

  db.connect().then(function (db) {
    var collection = db.collection('post');
    collection.find({}).toArray(function (err, data) {
      if (err) return err;
      res.json(data);
    });
  });
});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
//# sourceMappingURL=api.js.map