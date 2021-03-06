const request = require('request');
const config = require('../config.js');

let getReposByUsername = (username,callback) => {
  // console.log("this is helper username: ", username)
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    url: 'https://api.github.com/users/'+username+'/repos',
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };
  return new Promise((resolve, reject) => {

    request(options, (err, res, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
  // Complete the getReposByUsername function in helpers/github.js. In this function, you'll use the request npm module to fetch a user's repositories from the

}

module.exports.getReposByUsername = getReposByUsername;

