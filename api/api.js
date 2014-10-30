var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var _ = require('lodash');
var NodeCache = require( "node-cache" );

// Config variables
var MONGO_URL = 'mongodb://localhost:27017/libscore';

// In memory cache
var localCache = new NodeCache();



MongoClient.connect(MONGO_URL, function(err, db) {
  console.log("Connected correctly to server");

  // We will use v1, and switch to v2 when breaking changes.
  // We will just duplicate the code and put it another file



  app.get('/v1/libraries/:library', function(req, res){

    // Query parameters
    var skip = req.query.skip || 0;
    var limit = req.query.limit || 100;
    var library = req.params.library;

    getMostRecentCrawl(function(crawl) {

      var collection = db.collection('usage');
      var mostRecentCrawlTime = crawl.crawlTime;
      // Find some documents
      collection.find({library: library, crawlTime: mostRecentCrawlTime}, {limit: limit, skip: skip, sort: [['count', 'desc']]}).toArray(function(err, libraries) {
        libraries = _.map(libraries, function (lib) {
          return {
            library: lib.library,
            count: lib.count
          };
        });
        // TODO - Fix this all when we agree on API
        var lib = libraries[0];
        res.send({
          count: lib.count,
          sites: [],
          meta: {
            crawl: {
              crawlTime: mostRecentCrawlTime
            }
          }
        });

      });      
    });
  });

  app.get('/v1/libraries', function(req, res){

    // Query parameters
    var skip = req.query.skip || 0;
    var limit = req.query.limit || 100;
    getMostRecentCrawl(function(crawl) {

      var collection = db.collection('usage');
      var mostRecentCrawlTime = crawl.crawlTime;

      // Find some documents
      collection.find({crawlTime: mostRecentCrawlTime}, {limit: limit, skip: skip, sort: [['count', 'desc']]}).toArray(function(err, libraries) {
        libraries = _.map(libraries, function (lib) {
          return {
            library: lib.library,
            count: lib.count,
            resource: 'http://' + req.headers.host + '/v1/libraries/' + lib.library
          };
        });

        res.send({
          results: libraries,
          meta: {
            crawl: {
              crawlTime: mostRecentCrawlTime
            }
          }
        });

      });      
    });
  });



  // Get the most crawl and store the details in cache for 30 minutes at a time
  var getMostRecentCrawl = function (callback) {
    localCache.get('recentCrawl', function(err, value) {
      if(typeof value.recentCrawl === 'undefined') {
        var collection = db.collection('crawls');
        // Change this to .findOne, internet down couldn't remember syntax
        collection.find({}, {limit: 1, sort: [['crawlTime', 'desc']]}).toArray(function(err, crawls) {
          var recentCrawl = crawls[0];
          localCache.set('recentCrawl', recentCrawl, 1800, function (err, success) {
            console.log(arguments);
            callback(recentCrawl);
          });
        });
      } else {
        callback(value.recentCrawl);
      }
    });

  };

  app.listen(3000);

});