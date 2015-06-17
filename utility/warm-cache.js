var async = require('async');
var request = require('request');

var USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.124 Safari/537.36';
var URL_ROOT = 'http://api.libscore.com/v1/';
var LIMIT = 100;

browserRequest = request.defaults({
  headers: { 'User-Agent': USER_AGENT }
});

var options = {
  url: 'https://api.github.com/repos/request/request',
  headers: {
    'User-Agent': 'request'
  }
};

async.eachSeries(['libraries', 'scripts', 'sites'], function(category, callback) {
  browserRequest.get(URL_ROOT + category, function(err, response, body) {
    body = JSON.parse(body)
    console.log('\nWarming top ' + LIMIT + ' ' + category + '...');
    async.eachSeries(body.results.slice(0, LIMIT), function(item, callback) {
      browserRequest.get(item.resource, function(err, response, body) {
        console.log(response.statusCode + ' ' + item.resource);
        callback(null);
      });
    }, callback);
  });
}, function(err) {
  console.log('Done!');
});
