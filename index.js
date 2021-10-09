
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
     
    var fileName = 'index.html';
    res.sendFile(path.join(__dirname, fileName), options, function (err) {
        if (err) {
            next(err);
        } else {
            console.log('Sent:', fileName);
            next();
        }
    });
});
 
app.get('/', function(req, res){
    console.log("File Sent")
    res.send();
});
 



app.use(cors())
app.use((_, res, next) => {
  res.header('Content-Type', 'application/json')
  next()
})

app.get('/victoria-cases', async function(_, res) {
  console.log(`Proxy accessed`)
  let vicCases = []
  let response = await callApi()
  let htmlData = response.text
  const dom = new jsdom.JSDOM(htmlData);
  let table = dom.window.document.querySelector("table.DAILY-CASES");
  for (let i = table.children[0].children.length - 1; i >= 0; i--) {
    let eachDateObject = {}
    eachDateObject.date = table.children[0].children[i].children[0].textContent
    eachDateObject.cases = parseInt(table.children[0].children[i].children[1].textContent)
    vicCases.push(eachDateObject)
  }
  console.log(vicCases)
  res.status(201)
  res.json(vicCases)
})

function callApi() {
  return new Promise((resolve, reject) => {
    return request
      .get(`https://covidlive.com.au/report/daily-cases/vic`)
      .end((err, res) => {
        if (!err) {
          console.log("GET finished")
          resolve(res)
        }
        else {
          console.log("GET failed")
          reject(err)
        }
      })
  })
}



app.listen(port, function(err){
    if (err) console.log(err);
    console.log("app listening on PORT", port);
});


