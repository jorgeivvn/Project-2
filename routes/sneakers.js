var express = require('express');
var router = express.Router();

var sneaker = require('../controllers/sneakerControllers.js');

//Create a sneaker in closet
router.get('/add', function(req, res) {
  sneaker.create(req, res);
});

//To save sneaker
router.post('/save', function(req, res) {
  sneaker.save(req, res);
});

//show single sneaker by id that was saved
router.get('/:id', function(req, res) {
  sneaker.list(req, res);
});









module.exports = router;
