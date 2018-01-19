const express = require ('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;

var Sneaker = require('./models/sneakers');



//Middleware
app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('tiny'));
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// app.post('/user/:id/shoe/new', (req, res) => {
//   console.log(req.body);
// });


var db
mongoose.connect('mongodb://localhost/sneakercloset', (err, database) => {
  if (err) return console.log(err)
  db = database
  })

app.post('/user/:id/shoe/new', (req, res) => {
  db.collection('sneakers').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
})

// app.post('/user/:id/show/new', (req, res) => {
//   var myData = new Sneaker(req.body);
//   myData.save()
//   .then(item => {
//     res.send("item saved");
//   })
//   .catch(err => {
//     res.status(400).send("unable to save item");
//   });
// });










app.listen(3000, () => {
  console.log("What's Gucci?");
});
