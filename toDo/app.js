var express = require('express'),
    path = require('path'),
    logger = require('morgan'),
    bodyParser = require('body-parser');
    mongoose = require('mongoose');
    index = require('./routes/index')

mongoose.connect('mongodb://localhost/todos');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', index.home);
app.get('/todos', index.getTodos);
app.post('/newTodo', index.postNewTodo);
app.post('/editTodo', index.editTodo)
app.post('/deleteTodo', index.deleteTodo); //jquery didn't have a delete method

app.listen(3000);