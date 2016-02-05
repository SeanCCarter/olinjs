var exphbs = require('express-handlebars');
var express = require('express');
var index = require('./routes/index');
var cats = require('./routes/cats')
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
/*
All of this is "middleware" -- a stack of actions every request flows through on its
way to your routing logic.

Here's what's going on:
- The body parser middleware parses the body portion of a request stream out and places
in req.body so it's easier for you to interface with.
- The cookie parser does something similar, but for cookies -- it hasn't been useful
yet, but we'll talk about cookies soon!
- The path.join line lets you request things in '/public' as if they're in `/`.
- The way you're doing your routing is middleware-dependent, too! The app.use('/cats', index)
line intercepts requests with paths starting with '/cats' and directs them to index to be routed.

We'll explore some more middleware soon, and you can even write your own if you want!
*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', index.home);
app.get('/cats', cats.cats);
app.get('/cats/new', cats.newcats);
app.get('/cats/bycolor/:color', cats.bycolor)
app.get('/cats/byage/:smallestage/:largestage', cats.byage)
app.get('/cats/delete/old', cats.oldcats)

app.listen(3000);
