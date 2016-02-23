var User = require("../models/userModel");
var Twote = require("../models/twoteModel");
var passport = require('passport');

var home = function(req, res){
	User.find({}, function(err, users){
		if (err){
			console.log(err)
		}
		else {
			res.render("home", {'users':users})
		}
	});
};

var postTwote = function(req, res){
  console.log("Post twoted.")
  twote = new Twote();
  console.log(req.query)
  twote.text = req.query.text;
  twote.user = req.query.user;
  twote.save(function(err){
  	if (err){
  		console.log(err);
  	}
  });
  res.send(twote)
}

var login = function(req, res){
  res.render("login", {});	
}

var deleteTwote = function(req, res){
  console.log("User deleting a twote.")
  console.log(req.query)
  Twote.findOne({'_id':req.query.id}, function(err, twote){
  	if (err) {
  	  console.log(err)
  	}
  	else if (req.query.username === twote.user) {
  	  //Find the user specified, see if the password is right
      User.findOne({'name':req.query.username}, function(err, user){
      	if (err){
      		console.log(err)
      	}
    	  console.log("Twote deleted")
    	  twote.remove()
        res.send({'id':req.query.id, 'deleted':true})
      });
  	}
  	else {
  	  console.log(twote)
  	  console.log("User logged in as wrong person.")
  	  console.log(req.query.username)
  	  console.log("Should be:")
  	  console.log(twote.user)
  	  res.send({'id':req.query.id, 'deleted':false})
  	}
  });
}

var twoteList = function(req, res){
  console.log("Twotelist contacted on server.")
  twotes = Twote.find({}, function(err, twotes){
    if (err){
      console.log(err);
    }
    else {
      res.send(twotes.reverse());
    }
  });
}

module.exports.home = home;
module.exports.login = login;
module.exports.postTwote = postTwote;
module.exports.deleteTwote = deleteTwote;
module.exports.twoteList = twoteList;