var mongoose = require('mongoose');
var Sneaker = require('../models/sneakers');


var sneakerController = {};


//renders page with form to create new sneaker
sneakerController.create = function(req, res) {
  res.render('../views/createsnkrs');
};


//saves new pair of sneakers
sneakerController.save = function(req, res) {
  var sneaker = new Sneaker (req.body);
  sneaker.save(function(err) {
    if(err) {
      console.log(err);
      res.render('../views/sneakers/create');
    } else {
      
      res.redirect('/sneakers/show/'+sneaker._id);
    };
  });
};




module.exports = sneakerController;
