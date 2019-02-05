
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const ejs = require('ejs');

const app = express();
const path = require('path');

const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(expressLayouts);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
    .then((beers) => {
      console.log(beers);
      res.render('beers', { beers });
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get('/random', (req, res, next) => {
  punkAPI.getRandom()
    .then((beer) => {
      console.log(beer[0]);
      res.render('random', { beer });
    })
    .catch((error) => {
      console.log(error);
    });
});

app.listen(3000);
