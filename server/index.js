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
  const { username } = req.body;

  getReposByUsername(username)
    .then(data => db.save(data))
    .then(() => res.status(200))
    .catch(err => console.log(err));
});

app.get('/repos', function (req, res) {
  db.get()
    .then(data => res.send(data));
});
let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});


