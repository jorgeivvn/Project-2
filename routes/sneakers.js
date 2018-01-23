var express = require('express');
var router = express.Router();

var sneaker = require('../controllers/sneakerControllers.js');

//Create a sneaker in closet
router.get('/add', sneaker.create);

//To save sneaker
router.post('/save', sneaker.save);

//show single sneaker by id that was saved
router.get('/:id', sneaker.list);

//show all sneakers
router.get('/', sneaker.show);

//edit sneaker input
router.get('/edit/:id', sneaker.edit);

//update edited sneaker
router.post('/update/:id', sneaker.update);


router.post('/delete/:id', sneaker.delete);

module.exports = router;
