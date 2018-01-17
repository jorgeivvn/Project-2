const express = require ('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');



app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.set('view engine', 'ejs');








app.listen(3000, () => {
  console.log("What's Gucci?");
});
