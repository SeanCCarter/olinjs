var exphbs = require('express-handlebars');
var express = require('express');
var index = require('./routes/index');
var app = express();
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fakeDatabase = require('./fakeDatabase.js')

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
app.get('/cats', index.cats);
app.get('/cats/new', index.newcats);
app.get('/cats/bycolor/:color', index.bycolor)
app.get('/cats/delete/old', index.oldcats)

app.listen(3000);