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
  		}
	});
	res.send() //Makes the onSubmit function actually run
}

var resolveOrder = function(req, res){
	Order.findOne({_id:req.query.id}, function(err, order){
		if (err) {
			console.log(err)
		}
		else {
			console.log("Order removed.")
			order.remove()
		}
	})
}

var updateIngredient = function(req, res){
	Ingredient.update({_id:req.query.id}, req.query.update, {}, function(err, numAffected){
		if (err) {
			console.log(err);
		}
	});
}

var addIngredient = function(req, res){
	ingredient = new Ingredient(req.query)
	ingredient.save(function (err) {
  		if (err) {
    	console.log("Problem saving new ingredient", err);
  		}
	});
	res.send(ingredient) //Makes the onSubmit function actually run
}

module.exports.home = home;
module.exports.kitchenPage = kitchenPage;
module.exports.orderPage = orderPage;
module.exports.ingredientsPage = ingredientsPage;
module.exports.order = order;
module.exports.resolveOrder = resolveOrder;
module.exports.updateIngredient = updateIngredient;
module.exports.addIngredient = addIngredient;