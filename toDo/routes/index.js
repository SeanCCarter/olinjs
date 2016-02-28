paths = {};

paths.home = function(req, res){
	res.sendfile('./views/index.html')
}

module.exports = paths;