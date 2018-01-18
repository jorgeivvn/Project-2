const express = require ('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;


mongoose.connect('mongodb://localhost/user');

// var db
//
// MongoCLient.connect('mongodb://localhost:3000/user', (err, database) => {
//   if (err) return console.log(err)
//   db = database
//   app.listen(3000, () => {
//     console.log('listening on 3000')
//   })
// });

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.post('/user/:id/shoe/new', (req, res) => {
  console.log(req.body);
});







app.listen(3000, () => {
  console.log("What's Gucci?");
});
