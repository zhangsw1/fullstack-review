const express = require('express');
const parser = require('body-parser');
let app = express();
const db = require('../database/index.js');
const getReposByUsername = require('../helpers/github.js').getReposByUsername;
app.use(parser.json());
app.use(express.static(__dirname + '/../client/dist'));
app.use(parser.urlencoded({
  extended: true
}));
app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database

  // Complete the POST /repos endpoint on your express server - in this route, you'll use your getReposByUsername function to fetch the specified user's GitHub repos, then use your save function to store the repo information in database.

  var username = req.body.username;
  console.log("username!!!!!!!: ",username)
  //need to check if db has this person
  db.fetch(username,(err,data)=>{
    if(err){
      console.log("not right")
    }else{
      if(data.length===0){
        getReposByUsername(username, (err, results)=>{
          if(err){
            console.log("there is an error in server index.js", err);
          }else{
            //change from body(string) to obj
            var finalresults = JSON.parse(results.body);
            db.save(finalresults, (err, data)=>{
              if(err){
                console.log("can't save: ",err);
              }else{
                console.log("sucess save DATA!!!!!!====")
              }
            })
          }
        })
      }
    }
  })

  res.send("good")

});

// app.get('/repos', function (req, res) {
//   // TODO - your code here!
//   // This route should send back the top 25 repos
//   console.log("did you get here?")
//   db.get((err, data)=>{
//     if(err){
//       console.log("there is an error when getting data", err);
//     }else{
//       console.log("lololohere is your data",data)
//       res.send(data);
//     }
//   })
// });
app.get('/repos', function (req, res) {
  console.log("res",res)
  db.get()
    .then(data => res.send(data));
});
let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
