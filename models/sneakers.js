var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SneakerSchema = new Schema ({
  name: String,
  colorway: String,
  size: Number,
  cost: Number,
  worth: Number,
});

var Sneaker = mongoose.model('Sneaker', SneakerSchema);

module.exports = Sneaker; 
