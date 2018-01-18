const express = require ('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');


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
