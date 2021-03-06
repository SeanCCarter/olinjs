var exphbs = require('express-handlebars');
var express = require('express');
var index = require('./routes/index');
var app = express();
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var getCat = require('./routes/getCat.js');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', index.home);
app.get('/getCat', getCat.getCatGET);
app.post('/getCat', getCat.getCatPOST);

app.listen(3000);