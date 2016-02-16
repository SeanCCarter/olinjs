var $Ingredientform = $("#ingredient-form");

var onSuccess = function(data, status) {
  var ingredientList = document.getElementById("ingredientList");
  var ingredientItem = document.createElement("li");
  html = data.name+": <input type='text' name="+data._id+" value="+data.price+"><br>"
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

$('Button[class="IngredientUpdate"]').click(function(){
	var inStock = $("div[id=" + this.name +"]").find("input[type=checkbox]").is(":checked")
	var price = parseFloat($("div[id=" + this.name +"]").find("input[type=text]").val())
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