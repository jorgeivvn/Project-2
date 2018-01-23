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

//shows list of all sneakers
sneakerController.show = function(req, res) {
  Sneaker.find({}).exec(function(err, sneaker) {
    if(err) {
      console.log(err);
    } else {
      res.render('../views/index', {sneaker: sneaker});
    };
  });
};


sneakerController.edit = function(req, res) {
  Sneaker.findOne({_id: req.params.id}).exec(function (err, sneaker) {
    if(err) {
      console.log(err);
    } else {
      res.render('../views/editsnkrs', {sneaker: sneaker});
    };
  });
};

sneakerController.update = function(req, res) {
  Sneaker.findByIdAndUpdate(req.params.id, {$set: {brand: req.body.brand, name: req.body.name, colorway: req.body.colorway, size: req.body.size, cost: req.body.cost, worth: req.body.worth}}, {new:true}, function(err, sneaker) {
    if(err) {
      console.log(err);
      res.render('../views/editsnkrs', {sneaker: req.body});
    }
    res.redirect('../'+sneaker._id);
});
};

sneakerController.delete = function(req, res) {
  Sneaker.remove({_id: req.params.id}, function(err) {
    if(err) {
      console.log(err);
    } else {
      res.redirect('../');
    }
  })
};









module.exports = sneakerController;
