const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
// mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  userid : Number,
  username: String,
  repoid: { type : Number , unique : true, dropDups: true },
  repo_name: String,
  description: String,
  forkcount: Number
});
let Repo = mongoose.model('Repo', repoSchema);

let save = (repo, callback) => {
  var expect = [];

  for(var i = 0; i < repo.length;i++){
      var newrepo = new Repo({
        repoid: repo[i].id,
        username: repo[i].full_name,
        repo_name: repo[i].name,
        forkcount: repo[i].forks_count,
        description: repo[i].description
      })
      newrepo.save((err,newrepo) => {
        if (err){
          console.log("nonono");
          callback(err);
        }
        // console.log("******* this is newrepo", newrepo._doc)
        expect.push(newrepo._doc);
        // console.log("this is expect:", expect)
        // console.log("expect:", expect.length);
        // console.log("newrepo:", repo.length);
        if(expect.length === repo.length){
          // console.log("yayayayay");
          callback(null, expect);
        }
    });
  }
}


let get = (callback) => {

  console.log("did you get here")
  Repo.find().sort({forkcount: -1}).limit(25).exec((error, message)=>{
    if(error){
      console.log("its error")
      callback(error);
    }else{
      console.log("hahahahah", message)
      callback(null, message)
    }
  })
}

// sort({forkcount: 1}).


    // TODO: Your code here
    // This function should save a repo or repos to
    // the MongoDB


module.exports.save = save;
module.exports.get = get;