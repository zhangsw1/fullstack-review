const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  userid : Number,
  username: String,
  repoid: Number,
  repo_name: String,
  repo_url: String,
  forkcount: Number
});

let Repo = mongoose.model('Repo', repoSchema);


let save = (repo, callback) => {

  console.log("repo",repo)
  var newrepo = new Repo({
    repoid: repo[2].id,
    username: repo[2].full_name,
    repo_name: repo[2].name,
    forkcount: repo[2].forks_count,
    repo_url: repo[2].repos_url
  })
  console.log("this is newrepo!!!!",newrepo);
  // .save((err,result)=>{
  //   if(err){
  //     console.log("err", err);
  //   }else{
  //     console.log("yayayayayay")
  //     console.log("result", result)
  //     // callback(result._doc);
  //   }


  // console.log("this is my repo", repo)
  // console.log("length of repos", repo.length);
  // console.log("here is my repo!!!!!!!!!", repo)


  //   newrepo.save(err => {
  //     if (err){
  //       return console.log(err)
  //     }else{
  //       console.log("this is newrepo: ", newrepo)
  //     }
  // });


}


    // TODO: Your code here
    // This function should save a repo or repos to
    // the MongoDB


module.exports.save = save;