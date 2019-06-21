require('dotenv').config();
const express = require('express');
const axios = require('axios')
var app = express();

// this adds some logging to each request
app.set('view engine', 'ejs');
app.use(require('morgan')('dev'));
app.use(express.static(__dirname + '/static'));

app.get('/', function(req, res) {
  res.render('home');
});

app.get('/movies', function(req, res) {
  axios.get('https://www.omdbapi.com/?s=' + req.query.movie + '&apikey='+ process.env.OMDB_KEY)
  .then(function(result) {
    res.render('movie', {movies: result.data.Search});
  });
});

app.get('/movies/:id', function(req, res) {
  axios.get('https://www.omdbapi.com/?i=' + req.params.id + '&apikey='+ process.env.OMDB_KEY)
  .then(function(result) {
    //res.json(result.data);
    res.render('details', {movie: result.data});
  });
});

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
