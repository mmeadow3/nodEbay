// Load the SDK for JavaScript
var AWS = require('aws-sdk');
// Load credentials and set region from JSON file
AWS.config.loadFromPath('server/config.json');

// Create S3 service object
s3 = new AWS.S3({apiVersion: '2006-03-01'});

var params = {Bucket: 'nodebay'};
s3.listObjects(params, function(err, data){
  var bucketContents = data.Contents;
    for (var i = 0; i < bucketContents.length; i++){
      var urlParams = {Bucket: 'nodebay', Key: bucketContents[i].Key};
        s3.getSignedUrl('getObject',urlParams, function(err, url){
          console.log(url);
        });
    }
});

module.exports = {s3}
