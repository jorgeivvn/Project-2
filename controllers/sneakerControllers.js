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
      console.log('Saved to DB');
      res.redirect('/sneakers/'+sneaker._id);
    };
  });
};

//will render list of sneaker by id 
sneakerController.list = function(req, res) {
  Sneaker.findOne({_id: req.params.id}).exec(function (err, sneaker) {
    if(err) {
      console.log(err);
    } else {
      res.render('../views/listsnkrs', {sneaker: sneaker});
    }
  });
};




module.exports = sneakerController;
