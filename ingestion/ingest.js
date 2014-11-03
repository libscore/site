var utils = require('./utils');
var _ = require('lodash');
var MongoClient = require('mongodb').MongoClient;
var async = require('async');
// Config Variables
var LIBRARY_USAGE_MINIMUM = 20;
var SCRIPT_USAGE_MINIMUM = 20;

var MONGO_URL = 'mongodb://localhost:27017/libscore';

// REPLACE THESE VARIABLES
var rankCounter = 0;


var ingest = function (dumpFilePath, db) {

  var crawlTime = new Date().getTime();

  // The dump data is unfortunately not well formed json, so we have to convert it first
  utils.dumpToArray(dumpFilePath, function (crawlData){


    // Used to keep aggregate totals of library usage
    var libraryUsage = {};

    // Used to keep aggregate totals of script usage
    var scriptUsage = {};

    var sitesCollection = db.collection('sites');

      // 1) Calculate aggregate library usage

    _.each(crawlData, function(site){
      _.each(site.data.libs.desktop, function (lib) {
        if(typeof libraryUsage[lib] === 'undefined') {
          libraryUsage[lib] = 1;
        } else {
          libraryUsage[lib] += 1;
        } 
      });
      _.each(site.data.libs.mobile, function (lib) {
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

    // 2) Calculate aggregate script uage
    _.each(crawlData, function(site){
      _.each(site.data.scripts.desktop, function (script) {
        if(typeof scriptUsage[script] === 'undefined') {
          scriptUsage[script] = 1;
        } else {
          scriptUsage[script] += 1;
        } 
      });

      _.each(site.data.scripts.mobile, function (script) {
        if(typeof scriptUsage[script] === 'undefined') {
          scriptUsage[script] = 1;
        } else {
          scriptUsage[script] += 1;
        } 
      });
    });

    // Turn it into an array for easier sorting
    var scriptUsageArray = _.map(scriptUsage, function(value, key) {
      var script = {script: key, count:value, crawlTime: crawlTime};
      return script;
    });

    // Only include libraries that meet the threshold usages
    scriptUsageArray = _.filter(scriptUsageArray, function(script) {
      return script.count > SCRIPT_USAGE_MINIMUM ? true : false;
    });


    // 3 using library and script aggregate totals insert data
    //console.log('Finished', crawlData.length);
    async.eachLimit(crawlData, 20, function(site, callback){
      rankCounter++;
      var libraries = [];
      var scripts = [];
      _.each(site.data.libs.desktop, function(lib){
        // Check to make sure it reaches the usage limit
        if(libraryUsage[lib] > LIBRARY_USAGE_MINIMUM) {
          libraries.push({
            type: 'desktop',
            name: lib,
            count: libraryUsage[lib]
          })
        }
      });

      _.each(site.data.libs.mobile, function(lib){
        // Check to make sure it reaches the usage limit
        if(libraryUsage[lib] > LIBRARY_USAGE_MINIMUM) {
          libraries.push({
            type: 'mobile',
            name: lib,
            count: libraryUsage[lib]
          })
        }
      });


      _.each(site.data.scripts.desktop, function(script){

        // Check to make sure it reaches the usage limit
        if(scriptUsage[script] > SCRIPT_USAGE_MINIMUM) {
          scripts.push({
            type: 'desktop',
            name: script,
            count: scriptUsage[script]
          })
        }
      });

      _.each(site.data.scripts.mobile, function(script){
        // Check to make sure it reaches the usage limit
        if(scriptUsage[script] > SCRIPT_USAGE_MINIMUM) {
          scripts.push({
            type: 'mobile',
            name: script,
            count: scriptUsage[script]
          })
        }
      });

      // Sort libs and scripts before going into DB
      libraries = _.sortBy(libraries, function(lib) {
        return -lib.count;
      });
      scripts = _.sortBy(scripts, function(script) {
        return -script.count;
      });

      var siteSnapshot = {
        crawlTime: crawlTime,
        url: site.url,
        rank: site.rank,
        total: libraries.length, // TODO - This includes duplicate scripts across mobile and desktop
        libraries: libraries,
        scripts: scripts
      };
      sitesCollection.insert(siteSnapshot, function(err, result) {
        console.log('Logged site');
        callback();
      
      });

    }, function(err){

      // Insert library usage lookup 
      var libraryUsageCollection = db.collection('libraryUsage');

      libraryUsageCollection.insert(libraryUsageArray, function(err, result) {
        console.log("Inserted Library Usage Collection", result.length);
      });


      // Insert script usage lookup 
      var scriptUsageCollection = db.collection('scriptUsage');

      scriptUsageCollection.insert(scriptUsageArray, function(err, result) {
        console.log("Inserted Script Usage Collection", result.length);
      });

      // Log the crawl
      var crawlsCollection = db.collection('crawls');

      crawlsCollection.insert({crawlTime: crawlTime, status: 'success'}, function(err, result) {
        console.log("Crawl Logged");
      });



    });

    


  });


};


MongoClient.connect(MONGO_URL, function(err, db) {
  console.log("Connected correctly to server");

  // Start the ingestion process
  ingest('dump.json', db);

});