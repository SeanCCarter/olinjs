Todo = require("../models/todoModel.js")
paths = {};

paths.home = function(req, res){
	res.sendfile('./views/index.html')
}

paths.getTodos = function(req, res){
	Todo.find({}, function(err, todos){
		if (err){
			res.status(500).send("Problem finding todos");
			console.log(err)
		}
		else{
			res.send(todos)
		}
	})
}

paths.postNewTodo = function(req, res){
	todo = new Todo(req.body);
	todo.save(function(err){
		if (err){
			res.status(500).send("Problem saving new todo");
			console.log(err)
		}
		else{
			res.send(todo)
		}
	});
}

paths.editTodo = function(req, res){
	delete req.body.$$hashKey
	Todo.update({_id:req.body._id}, req.body, {multi:true}, function(err, num){
		if (err){
			res.status(500).send("Problem updating todo");
			console.log(err)
		}
		else{
			res.send()
		}
	})
};

paths.deleteTodo = function(req, res){
	Todo.remove({_id:req.body._id},function(err){
		if (err) {
			res.status(500).send("Problem deleting todo");
			console.log(err)
		}
		else{
			res.send(req.body)
		}
	})
}

module.exports = paths;