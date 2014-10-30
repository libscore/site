var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;

var MONGO_URL = 'mongodb://localhost:27017/libscore';

MongoClient.connect(MONGO_URL, function(err, db) {
  console.log("Connected correctly to server");


  app.get('/libs', function(req, res){
     var collection = db.collection('usage');
    // Find some documents
    collection.find({}).toArray(function(err, docs) {
      res.send(docs);
    });      

  });

  app.listen(3000);

});