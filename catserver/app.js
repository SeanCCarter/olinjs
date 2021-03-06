var exphbs = require('express-handlebars');
var express = require('express');
var index = require('./routes/index');
var cats = require('./routes/cats');
var catForms = require('./routes/catForms');
var app = express();
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/cats');

//I Understand what these do, mostly.
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(logger('dev'));

//I'm not quite as sure about these.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', index.home);
app.post('/viewCats', catForms.viewCats)
app.get('/newCat', catForms.newCat)
app.get('/sortCats', catForms.sortCats)
app.get('/killCat', catForms.killCat)

app.get('/cats', cats.cats);
app.get('/cats/new', cats.newcats);
app.get('/cats/bycolor/:color', cats.bycolor)
app.get('/cats/byage/:smallestage/:largestage', cats.byage)
app.get('/cats/delete/old', cats.oldcats)

app.listen(3000);