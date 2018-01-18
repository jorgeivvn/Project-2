var mongoose = require('mongoose');


//Not sure about the /user
mongoose.connect("mongodb://localhost/user");


module.exports.Sneaker = require("./sneakers");
