var mongoose = require('mongoose');


//Not sure about the /user
mongoose.connect("mongodb://localhost/sneakercloset");

var Sneaker = require('./sneakers');

module.exports.Sneaker = Sneaker;
