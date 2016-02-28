angular.module('toDo',[

])
.controller("Main", function($scope) {

	//Creating todo List, adding/deleting/editing Todos
	$scope.todos = [
	  {done:"done", checked:true, text:"Hello World."}
	]; //Array of all todos

	function resetTodoForm(){
		//Clears the form for the next entry
		$scope.newtodo = {
		 	text:""
		}
	}
	function createTodo(todo){
		console.log("Created todo")
		todo.checked = false;
		$scope.todos.push(todo);
	    resetTodoForm();
	}

	function deleteTodo(todo){
		index = $scope.todos.indexOf(todo);
		$scope.todos.splice(index, 1);
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
		$scope.toggleEditing = true;
		$scope.editedTodo = todo;
	}

	function finishEditing(){
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