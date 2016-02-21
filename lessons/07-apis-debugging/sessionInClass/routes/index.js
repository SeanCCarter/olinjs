pages = {}

pages.index = function(req, res){
	console.log("Reached Index.")
	res.render("index")
}

pages.login = function(req, res){
	res.render("login")
}

module.exports = pages;