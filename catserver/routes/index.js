var express = require('express');
var router = express.Router();
var db = require('../fakeDatabase');

var home = function(req, res){
  console.log("home function called")
  res.render("home");
};

var cats = function(req, res){
	console.log("Cats function called.");
	cats = db.getAll();
	console.log(cats);
	if (cats.length !== 0) {
		res.render("cats", {"cats": cats});
	}
	else{
		res.render("nocats");
	}
};

var newcats = function(req, res){
	console.log("newcat function called.")
	cat = {
		name: names[Math.floor(Math.random()*names.length)],
		age: Math.floor(Math.random()*25),
		color: colors[Math.floor(Math.random()*colors.length)]
		}
	db.add(cat)
	res.render("newcats", cat)
};

var bycolor = function(req, res){
	console.log("Sorting by color")
	cats = db.getAll();
	newcats = [];
	for(i=0;i<cats.length;i++)
	{
		if (cats[i].color === req.params.color) {
			newcats.push(cats[i]);
		};
	};
	console.log(newcats)
	res.render("cats", {"cats": newcats})
};

var oldcats = function(req, res){
	var cats = db.getAll();
	if (cats.length !== 0) {
		oldestcat = ageindexer(cats);
		console.log("Removing cat.");
		console.log(oldestcat);
		res.render("oldcats", cats[oldestcat]);
		db.remove(oldestcat);
	}
	else {
		res.render("nocats")
	}
};

function ageindexer(cats) {
  console.log("Aged indexed.")
  oldestindex = 0;
  oldestage = 0;
  for (i=0;i<cats.length;i++)
  {
  	if (cats[i].age > oldestage) {
  		oldestindex = i;
  		oldestage = cats[i].age
  	}
  }
  return oldestindex;
}

module.exports.home = home;
module.exports.cats = cats;
module.exports.bycolor = bycolor;
module.exports.newcats = newcats;
module.exports.oldcats = oldcats;

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

