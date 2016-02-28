angular.module('toDo',[

])
.controller("Main", function($scope) {

	//Creating todo List, adding/deleting/editing Todos
	$.get("/todos", {})
		//Gets all the todos from the database
		.done(function(data, status){
			$scope.todos = data;
			$scope.$apply(); //It won't refresh. This fixes it.
							 //I don't really know why.
		})
		.error(function(err, status){
			console.log(err)
			console.log(status)
		});
	function resetTodoForm(){
		//Clears the form for the next entry
		$scope.newtodo = {
		 	text:""
		}
	}
	function createTodo(todo){
		todo.checked = false;
		$.post("/newTodo", todo)
			.done(function(data, status){
				$scope.todos.push(data);
				$scope.$apply();
			})
			.error(function(err, status){
				console.log(err);
				console.log(status);
			})
	    resetTodoForm();
	}

	function deleteTodo(todo){
		$.post("/deleteTodo", todo)
			.done(function(data, status){
				index = $scope.todos.indexOf(data);
				$scope.todos.splice(index, 1);
				$scope.$apply()
			})
			.error(function(err, status){
				console.log(err);
				console.log(status);
			})
	}
	$scope.createTodo = createTodo;
	$scope.deleteTodo = deleteTodo;

	//Edit the todos
	$scope.toggleEditing = false;
	$scope.editedTodo = {};
	function startCreating(){
		if($scope.toggleEditing){$scope.toggleEditing=false}
		else{$scope.toggleEditing=true}
	}
	function shouldShowCreating(){
		return !$scope.toggleEditing;
	}
	function shouldShowEditing(){
		return $scope.toggleEditing;
	}

	function editTodo(todo){
		console.log("Editing now.")
		$scope.toggleEditing = true;
		$scope.editedTodo = todo;
	}

	function finishEditing(){
		$.post("/editTodo", $scope.editedTodo)
			.done(function(data, status){})
			.error(function(err, status){
				console.log(err)
				console.log(status)
			})
		$scope.toggleEditing = false;
		$scope.editedTodo = null;
	}
	$scope.startCreating = startCreating;
	$scope.shouldShowEditing = shouldShowEditing;
	$scope.shouldShowCreating = shouldShowCreating;
	$scope.editTodo = editTodo;
	$scope.finishEditing = finishEditing;
	///////////////////////////////

	//displaying todos
	$scope.displayDone = null
	$scope.doneFilter = function(todo){
		if ($scope.displayDone === null){
			return true
		}
		else{
			return (todo.checked == $scope.displayDone)
		}
	};

	function setDoneFilter(state){
		$scope.displayDone = state;
	}
	$scope.setDoneFilter = setDoneFilter;
	//////////////////
})