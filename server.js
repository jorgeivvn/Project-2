var express = require ('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;

var Sneaker = require('./models/sneakers');

var index = require('./routes/index');

//Middleware
app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('tiny'));
app.set('view engine', 'ejs');

app.use('/', index);

var db
mongoose.connect('mongodb://localhost/sneakercloset', (err, database) => {
  if (err) return console.log(err)
  db = database
  })


//**ROUTES**

//This is "homepage", sent to routes index.js
// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/views/index.html');
// });

//saves to database to post..
app.post('/user/:id/shoe/new', (req, res) => {
  db.collection('sneakers').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/user/:id/shoe/new')
  });
});

//renders to page "index.ejs"
app.get('/user/:id/shoe/new', (req, res) => {
  db.collection('sneakers').find().toArray(function(err, result) {
    if (err) return console.log(err);
    res.render('index.ejs', {sneakers: result})
  });
});



app.listen(3000, () => {
  console.log("What's Gucci?");
});
