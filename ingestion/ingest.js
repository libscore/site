var utils = require('./utils');
var _ = require('lodash');
var MongoClient = require('mongodb').MongoClient;

// Config Variables
var LIBRARY_USAGE_MINIMUM = 20;
var MONGO_URL = 'mongodb://localhost:27017/libscore';


var ingest = function (dumpFilePath, db) {

  var crawlTime = new Date().getTime();

  // The dump data is unfortunately not well formed json, so we have to convert it first
  utils.dumpToArray(dumpFilePath, function (crawlData){


    // Used to keep aggregate totals of library usage
    var libraryUsage = {};


    //console.log('Finished', crawlData.length);

    /*_.each(crawlData, function(site){

    // 1) Log that the sites snapshot data
      var siteSnapshot = {
        crawlTime: crawlTime,
        url: site.url,
        rank: 0,
        total: site.libs.window.desktop.length,
        libraries: site.libs.window.desktop // Add more here
      }
      //console.log(siteSnapshot);
    });*/

    // 2) Calculate aggregate library usage

    _.each(crawlData, function(site){
      _.each(site.libs.window.desktop, function (lib) {
        if(typeof libraryUsage[lib] === 'undefined') {
          libraryUsage[lib] = 1;
        } else {
          libraryUsage[lib] += 1;
        }
      });
    });

    // Turn it into an array for easier sorting
    var libraryUsageArray = _.map(libraryUsage, function(value, key) {
      var lib = {library: key, count:value, crawlTime: crawlTime};
      return lib;
    });

    // Only include libraries that meet the threshold usages
    libraryUsageArray = _.filter(libraryUsageArray, function(lib) {
      return lib.count > LIBRARY_USAGE_MINIMUM ? true : false;
    });

    // Insert into Mongo
    var usageCollection = db.collection('usage');

    usageCollection.insert(libraryUsageArray, function(err, result) {
      console.log("Inserted 3 documents into the document collection", result.length);
      //callback(result);
    });
    //console.log(libraryUsageArray);
  });


};


MongoClient.connect(MONGO_URL, function(err, db) {
  console.log("Connected correctly to server");

  // Start the ingestion process
  ingest('dump.json', db);

});