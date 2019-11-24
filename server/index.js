const express = require('express');
const parser = require('body-parser');
let app = express();
// globalv = null;
const db = require('../database/index.js');
const getReposByUsername = require('../helpers/github.js').getReposByUsername;
app.use(parser.json());
app.use(express.static(__dirname + '/../client/dist'));
// must use below, otherwise it would not read the form of input
app.use(parser.urlencoded({
  extended: true
}));
app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  var username = req.body.username;
  // globalv = req.body.username;
  // console.log("req: ", req)
  // console.log("req.body: ",req.body)
  // console.log("this is my name:", username);
  getReposByUsername(username, (err, result)=>{
    if(err){
      console.log("please error")
      console.log(err);
    }else{
      // console.log("heyheyhey")
      // console.log("this is reault", result.body)
      var finalrepo = JSON.parse(result.body);
      // console.log("this is finalrepo:",finalrepo)
      db.save(finalrepo, (err1, data)=>{
        console.log("this is data!!")
        if(err1){
              console.log(err1);
            }
            console.log("this is data stringify")

          })
    }


  })

  res.send("perfect");
});

app.get('/repos', function (req, res) {
  // console.log("parammmms",JSON.stringify(req))
  console.log("yes im here")
  // TODO - your code here!
  // This route should send back the top 25 repos
  db.get(function(error, result){
    if(error){
      console.log("get error!!!-from index.js")
      throw error;
    }else{
     console.log("here is 25: ", result)
      res.send(result);
    }
  })


});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

