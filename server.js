require('dotenv').load();

var express = require('express');
var app = express();
const monk = require('monk');

const db = monk(process.env.MONGO_URI);
const collection = db.get('document');
var appUrl = '';

db.then(() => {
  console.log('Connected correctly to server');=
});

app.use(function(req, res, next) {
  req.db = db;
  next();
});

app.get('/', function(req, res) {
  res.send('Hello World!');
});

app.get('/new', function(req, res) {
  res.status(401).send({
    'error': 'You have to append the URL to the path.',
  });
});

app.get('/new/:url*', function(req, res) {
  // @TODO validate URL
  appUrl = `http://${req.get('host')}`;
  const url = req.params.url + req.params[0];
  // find Url
  findUrl(url).then((urlObject) => {
    if (urlObject) {
      formatAndResponse(res, urlObject);
    } else {
      insertUrl(url, res);
    }
  });
});

function findUrl(url) {
  return collection.findOne({url: url});
}

function insertUrl(url, res) {
  // insert new url
  // get max number
  collection.findOne({}, { sort: {id: -1} })
    .then((doc) => {
      const id = doc.id;
      const nextId = (id || 0) + 1;

      collection.insert({id: nextId, url: url})
      .then((urlObject) => {
        formatAndResponse(res, urlObject);
      })
      .catch((err) => {});
    })
    .catch((err) => {});
}

function formatAndResponse(res, urlObject) {
  const obj = {
    'original_url': urlObject.url,
    'short_url': `${appUrl}/${urlObject.id}`
  }
  res.send(obj);
}

app.get('/:id', function(req, res) {
  const id = parseInt(req.params.id);
  collection.findOne({id: id}).then((urlObject) => {
    if (urlObject) {
      // redirect to the url
      res.redirect(urlObject.url);
    } else {
      res.status(404).send({
        error: "The short url is not valid."
      });
    }
  });
});

app.listen(3000, function() {
  console.log('URL Shortner app listening on port 3000!');
});