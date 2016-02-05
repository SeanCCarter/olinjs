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
  	} else {
  		res.render("newcats", newcat);
  		// It's a good idea to do your rendering inside the save method after handling the
  		// error so you don't render the cat if it wasn't actually saved
  	}
	});

	// Fixed the indenting/spacing to be consistent/conventional -- we'll add
	// linters later which will check conventions for you :)

	// This looks great, and I love the comments!
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
	/* 
	The first line is so long/complicated that I might build the query object first:
	var query = { 
		$and:[
			{age: {$gt: req.params.smallestage}},
			{age: {$lt: req.params.largestage}}
		] 
	};

	...and then 
	Cat.find(query, function(err, cats) {...});

	A little easier to understand/maintain that way.
	Awesome advanced query :)
	*/
	Cat.find({ $and:[{age:{$gt:req.params.smallestage}},{age:{$lt:req.params.largestage}}] }, function(err, cats) {
		res.render("cats", {"cats": cats});
	});
};

cats.oldcats = function(req, res){
	Cat.find().sort({age: -1}).exec(function(err, cats) { // nice method chaining
		if (cats.length !== 0) {
			oldestcat = cats[0];
			oldestcat.remove(function(err) {
				res.render("oldcats", oldestcat);
				/* 
				best practice to do this last -- in this case, inside the callback
			  (I think there's a callback here -- if not, just put the `res.render` line
				after the oldestcat.remove() line)
				*/
			});
			
		} else {
			res.render("nocats"); // awesome that you're catching the edge case!
		}
	});

	/*
	Best practice to get rid of debugging mechanisms (e.g. console.log statements)
	before submitting your code -- if you had console.logs in a production app, you'd
	fill up your logs with unnecessary info in no time :/
	*/
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
// Names from http://listofrandomnames.com/ :)
