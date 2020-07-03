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
  id: { type : Number , unique : true, dropDups: true },
  repourl : String,
  username: String,
  reponame : String,
  forkcount: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repos) => {
  // console.log("this is repos",repos)
  repos = JSON.parse(repos);
  var data = [];
  repos.forEach(repo=>{
    data.push({
      id: repo.id,
      username: repo.owner.login,
      reponame: repo.name,
      repourl: repo.html_url,
      forkcount: repo.forks_count
    })
  })
  Repo.collection.insert(data, (err, result) => {
    if (err) {
      console.log(err);
    }else{
      console.log("data insert")
    }
  });
}

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
module.exports.save = save;
module.exports.get = get;

