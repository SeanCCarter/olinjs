var exphbs = require('express-handlebars');
var express = require('express');
var index = require('./routes/index');
var app = express();
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/cheeseburger');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', index.home);
app.get('/kitchen', index.kitchenPage);
app.get('/order', index.orderPage);
app.get('/ingredients', index.ingredientsPage);

app.get('/submitOrder', index.order)
app.get('/resolveOrder', index.resolveOrder)
app.get('/updateIngredient', index.updateIngredient)
app.get('/addIngredient', index.addIngredient)

app.listen(3000);

module.exports = app