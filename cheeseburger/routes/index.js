var Ingredient = require('../models/ingredientModel.js');
var Order = require('../models/orderModel.js');

var home = function(req, res){
  res.render("home");
};

var kitchenPage = function(req, res){
  Order.find({}, function(err, orders){
  	res.render("kitchen", {'orders':orders})
  })
}

var orderPage = function(req, res){
  console.log("Opened Order page")
  Ingredient.find({}, function(err, ingredients){
  	console.log(ingredients)
  	res.render("order", {'ingredients': ingredients});
  })
  
}

var ingredientsPage = function(req, res){
	console.log("Opening ingredients page");
	Ingredient.find({}, function(err, ingredients){
		console.log(ingredients)
		res.render("ingredients", {'ingredients':ingredients});
	})
}

var order = function(req, res){
	order = new Order(req.query)
	console.log("Ordering function reached.")
	order.save(function (err) {
  		if (err) {
    	console.log("Problem saving new order", err);
    	res.status(500).send("Problem saving new order"); //You want to signal to the client that something
    	// bad happened so onError will run
  		} else {
  			res.end(); // do the error checking before you end the req. 
  		}

	});
	//res.send() //Makes the onSubmit function actually run
}

var resolveOrder = function(req, res){ //This will hang
	Order.findOne({_id:req.query.id}, function(err, order){
		if (err) {
			console.log(err)
			res.status(500).send("Problem resolving order");
		}
		else {
			console.log("Order removed.")
			order.remove()
			res.end();//End the request somehow. This could be a send or json also. 
		}
		
	})
}

var updateIngredient = function(req, res){ //this will also hang
	Ingredient.update({_id:req.query.id}, req.query.update, {}, function(err, numAffected){
		if (err) {
			console.log(err);
		} else {
			res.end();//See above
		}
	});
}

var addIngredient = function(req, res){
	ingredient = new Ingredient(req.query)
	ingredient.save(function (err) {
  		if (err) {
    	console.log("Problem saving new ingredient", err);
    	res.status(500).send("Problem saving ingredient");
  		} else {
  		res.send(ingredient) //make sure error checking is done before you send back to the client
  		}
	});
	//res.send(ingredient) //Makes the onSubmit function actually run
}

module.exports.home = home;
module.exports.kitchenPage = kitchenPage;
module.exports.orderPage = orderPage;
module.exports.ingredientsPage = ingredientsPage;
module.exports.order = order;
module.exports.resolveOrder = resolveOrder;
module.exports.updateIngredient = updateIngredient;
module.exports.addIngredient = addIngredient;