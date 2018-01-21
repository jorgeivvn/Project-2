var mongoose = require('mongoose');
var Sneakers = require('../models/sneakers');


var sneakerController = {};


sneakerController.create = function(req, res) {
  res.render('../views/createsnkrs');
};




module.exports = sneakerController;
