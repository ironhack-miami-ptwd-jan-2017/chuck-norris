const express = require('express');
const Chuck = require('chucknorris-io');

const app = express();
const client = new Chuck();

// ------------------------------------


app.get('/random', (req, res, next) => {

  client.getRandomJoke().then((jokeData) => {
    console.log('Here is the joke info');
    console.log(jokeData);

    res.render('random-joke-view.ejs', {
      joke: ___
    });
  });

});
