
var express = require('express');
const path = require('path');
var app = express();
const port = process.env.PORT || "9000";
const cors = require('cors')
const request = require('superagent')
const jsdom = require("jsdom");
// With middleware
app.use('/', function(req, res, next){
    
  var options = {
      root: path.join(__dirname)
  };
  var fileName = 'hello.html';
  console.log("client/build/"+fileName)
  res.sendFile(fileName, options);
});
 

 







app.listen(port, function(err){
    if (err) console.log(err);
    console.log("app listening on PORT", port);
});


