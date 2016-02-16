var Cat = require('../models/catModel.js');


var catForms = {}
catForms.viewCats = function(req, res){
	console.log("viewCats function called.");
	Cat.find({}, function(err, cats){
  		return cats
	});
};

catForms.newCat = function(req, res){
	console.log("newCat function called.")
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
	return [newcat]
};

catForms.sortCats = function(req, res){
	console.log("Sorting cats by color")
	console.log(req.query.color);
	Cat.find({color:req.query.color}, function(err, cats){
		console.log(cats);
		return [cats]
	});
};

catForms.killCat = function(req, res){
	Cat.find().sort({age:-1}).exec(function(err, cats){
		if (cats.length !== 0) {
			oldestcat = cats[0];
			console.log("Removing cat.");
			oldestcat.remove();
			return [oldestcat];
		}
		else {
			return [];
		}
	});
};

module.exports = catForms;

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