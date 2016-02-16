var Cat = require('../models/catModel.js');

var cats = {}
cats.cats = function(req, res){
	console.log("Cats function called.");
	Cat.find({}, function(err, cats){
  		console.log(cats);
  		if (cats.length !== 0) {
			res.render("cats", {"cats": cats});
		}
		else{
			res.render("nocats");
		}
	});
};