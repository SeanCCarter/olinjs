var $Ingredientform = $("#ingredient-form");

var onSuccess = function(data, status) {
  //so this is straight javascript. You have jquery available to you. 
  var ingredientList = document.getElementById("ingredientList");//$("#ingredientList")
  var ingredientItem = document.createElement("li");
  //don't create a variable with var unless you intend it to be global scope.
  var html = data.name+": <input type='text' name="+data._id+" value="+data.price+"><br>"
  if (data.inStock){
  	html += "<input type='checkbox' name="+data._id+" value='inStock' checked> In Stock<br>";
  }
  else {
  	html += "<input type='checkbox' name="+data._id+" value='inStock'> In Stock<br>";
  }
  html += "<button type='button' name="+data._id+" class = 'IngredientUpdate'>Update Ingredient Info.</button>";
  ingredientItem.innerHTML = html;
  ingredientList.appendChild(ingredientItem); 
};

var onError = function(data, status) {
  console.log("status", status);
  console.log("error", data);
};

//can select a class using $(".ClassName")
$('Button[class="IngredientUpdate"]').click(function(){
  //can select an id using $("#IdName")
	var inStock = $("div[id=" + this.name +"]").find("input[type=checkbox]").is(":checked")
	var price = parseFloat($("div[id=" + this.name +"]").find("input[type=text]").val())
  //should generally use post requests for sending data to client. 
	$.get("/updateIngredient", {id:this.name, update:{inStock:inStock, price:price}})
});

$Ingredientform.submit(function(event) {
  event.preventDefault();
  var name = $Ingredientform.find("[name='name']").val();
  var price = parseFloat($Ingredientform.find("input[name='ingredientPrice']").val());
  var instock = $Ingredientform.find("input[type=checkbox]").is(":checked");
  $.get("addIngredient", {
    name: name,
    price: price,
    inStock: instock
  })
  .done(onSuccess)
  .error(onError);
});