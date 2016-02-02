var home = function(req, res){
  console.log("home function called")
  res.render("home");
};

module.exports.home = home;



