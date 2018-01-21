var express = require('express');
var router = express.Router();

var sneaker = require('../controllers/sneakerControllers.js');

//Create a sneaker in closet
router.get('/add', function(req, res) {
  sneaker.create(req, res);
});










module.exports = router;
