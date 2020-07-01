const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/fetcher', {useMongoClient: true}, (err) => {
  if(err) {
    console.log(err);
  }else {
    console.log("[Mongo DB] Successfully connected!");
  }
});
let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  repourl : { type: String, unique: true },
  username: String,
  reponame : String,
  forkcount: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repos,callback) => {
  var expect = [];
  for(var i =0; i < repos.length; i++){
    var repo = new Repo({
      username: repos[i].owner.login,
      reponame: repos[i].name,
      repourl: repos[i].html_url,
      forkcount: repos[i].forks_count
    })

    repo.save((err, repo)=>{
      if(err){
        console.log("there is an error in the repo save", err);
      }
      expect.push(repo);
      // console.log("there is expect", expect)
      if(repos.length === expect.length){
        // console.log("there is expectafterrrr", expect)
        callback(null, expect)

      }
    })

  }

}


let fetch =(username,callback) => {
  Repo.find({username}).exec(function(err,data){
    if(err){
      console.log("fetch one user has errors: ", err);
    }else{
      console.log("fetch one user is good")
      callback(null, data);
    }
  })
}

// let get = (callback) => {
//   Repo.find().sort({forkcount:-1}).limit(25).exec(function(err,data){
//     if(err){
//       console.log("there is an error in get: ");
//       callback(err);
//     }else{
//       console.log("getting data is perfect", data)
//       callback(null,data);
//     }
//   })
// }
let get = () => {
  return new Promise((resolve, reject) => {
    Repo
      .find({})
      .sort({forkcount: -1})
      .limit(25)
      .exec((err, docs) => {
        resolve(docs);
      });
  });
}
module.exports.fetch = fetch;
module.exports.save = save;
module.exports.get = get;