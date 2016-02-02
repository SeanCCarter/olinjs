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

cats.newcats = function(req, res){
	console.log("newcat function called.")
	//Creating the new cat
	var newcat = new Cat({
		name: names[Math.floor(Math.random()*names.length)],
		age: Math.floor(Math.random()*25),
		color: colors[Math.floor(Math.random()*colors.length)]
		});
	//Saving the new cat to a database
	newcat.save(function (err) {
  		if (err) {
    	console.log("Problem saving new cat", err);
  		}
	});
	res.render("newcats", newcat)
};

cats.bycolor = function(req, res){
	console.log("Sorting by color")
	console.log(req.params.color)
	Cat.find({color:req.params.color}, function(err, cats){
		console.log(cats)
		res.render("cats", {"cats": cats})
	});
};

cats.byage = function(req, res){
	console.log("Sorting by age.")
	console.log(req.params.smallestage);
	console.log(req.params.largestage);
	Cat.find({ $and:[{age:{$gt:req.params.smallestage}},{age:{$lt:req.params.largestage}}] }, function(err, cats){
  		console.log(cats);
		res.render("cats", {"cats": cats});
	});
};

cats.oldcats = function(req, res){
	Cat.find().sort({age:-1}).exec(function(err, cats){
		if (cats.length !== 0) {
			oldestcat = cats[0];
			console.log("Removing cat.");
			console.log(oldestcat);
			res.render("oldcats", oldestcat);
			oldestcat.remove()
		}
		else {
			res.render("nocats")
		}
		});
};

module.exports = cats;

var colors = ["brown", "black", "white", "green", "purple", "red"];

var names = ['Kathryn', 'Dantin', 'Marya', 'Caya', 'Shawnta', 'Nourse', 'Heidi', 'Fruge', 
'Shaunna', 'Mckitrick', 'Martina', 'Herdman', 'Kia', 'Phillip', 'Junko', 'Kingston', 'Hunter', 
'Isreal', 'Janice', 'Keefe', 'Gaston', 'Goble', 'Rose', 'Domenech', 'Rea', 'Kirts', 'Dorthy', 
'Filice', 'Chadwick', 'Enoch', 'Santiago', 'Daughtry', 'Tashina', 'Spain', 'Zina', 'Avis', 'Johnie', 
'Aoki', 'Reanna', 'Mcguigan', 'Darby', 'Sirianni', 'Shannan', 'Whetsel', 'Carin', 'Dorais', 'Lang', 
'Mattinson', 'Delicia', 'Files', 'Shala', 'Meeker', 'Latisha', 'Peery', 'Alfredia', 'Borjas', 'Lita', 
'Hatley', 'Astrid', 'Bolton', 'Deidre', 'Eager', 'Lilian', 'Dolce', 'Tamika', 'Militello', 'Jettie', 
'Stillwell', 'Margit', 'Clevinger', 'Vergie', 'Bundren', 'Daine', 'Winrow', 'Herta', 'Deford', 'Marshall', 
'Halbert', 'Noelia', 'Michaux', 'Bettie', 'Henault', 'Neil', 'Defalco', 'Carlena', 'Farrar', 'Brianna', 
'Ohair', 'Gertie', 'Dingee', 'Lavelle', 'Rosengarten', 'Letitia', 'Mccallion', 'Jerlene', 'Mesta', 'Phil', 
'Blackmer', 'Rodolfo', 'Shoults'];
// Names from http://listofrandomnames.com/