var lineReader = require('line-reader');


var dumpToArray = function (dumpFilePath, callback) {
  var crawlData = [];
  lineReader.eachLine(dumpFilePath, function(line, last) {
    crawlData.push(JSON.parse(line));
    if(last) {
      callback(crawlData);
    }
  });
}

module.exports = {
  dumpToArray: dumpToArray
}