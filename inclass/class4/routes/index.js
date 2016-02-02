var Robot = require('../models/robotModel.js');

var home = function(req, res){
  Robot.find({}, function(err, robots){
  	res.render("home", {"robots": robots});
  });

  

};


module.exports.home = home;