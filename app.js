const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const Chuck = require('chucknorris-io');


const app = express();
const client = new Chuck();


app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(expressLayouts);
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res, next) => {
  res.render('home-view.ejs');
});

app.get('/random', (req, res, next) => {
  client.getRandomJoke().then((jokeData) => {
    // Always console log the result when using 3rd party APIs
    console.log('\ngetRandomJoke()');
    console.log(jokeData);

    res.render(
      'random-joke-view.ejs',
      { joke: jokeData.value }
    );
  });
});

app.get('/categories', (req, res, next) => {
  if (req.query.cat === undefined) {
    client.getJokeCategories().then((categoriesData) => {
      console.log('\ngetJokeCategories()');
      console.log(categoriesData);

      res.render(
        'categories-view.ejs',
        { categories: categoriesData }
      );
    });
  }
  else {
    client.getRandomJoke(req.query.cat).then((jokeData) => {
      console.log(`\ngetRandomJoke(${req.query.cat})`);
      console.log(jokeData);

      res.render(
        'joke-by-category-view.ejs',
        {
          joke: jokeData.value,
          category: req.query.cat
        }
      );
    });
  }
});

app.get('/search', (req, res, next) => {
  res.render('search-form-view.ejs');
});

app.post('/search', (req, res, next) => {
  client.search( req.body.keyword ).then((searchData) => {
    console.log(`\nsearch(${req.bodykeyword})`);
    console.log(searchData);

    res.render(
      'search-results-view.ejs',
      {
        searchResults: searchData.items,
        searchTerm: req.body.keyword
      }
    );
  });
});


app.listen(3000);
