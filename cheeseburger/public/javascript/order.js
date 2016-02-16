var $form = $("#order-form");
var totalValue = 0;

var onSuccess = function(data, status) {
  $("#result").html("Order Submitted.")
};

var onError = function(data, status) {
  console.log("status", status);
  console.log("error", data);
};

$('input[class="ingredientbox"]').click(function() {
  if ($(this).is(":checked")) {
    totalValue += parseFloat($(this)[0].value)
    $("#result").html(totalValue.toString())
  } else {
    totalValue -= parseFloat($(this)[0].value)
    $("#result").html(totalValue.toString())
  }
});

$form.submit(function(event) {
  event.preventDefault();
  var name = $form.find("[name='name']").val();
  var ingredientdata = $form.find("input[class='ingredientbox']:checked");
  var ingredients = [];
  for (i=0;i<ingredientdata.length;i++) {
  	ingredients.push(ingredientdata[i].name);
  }
  //$("#result").html("Order Submitted.")
  $.get("submitOrder", {
    name: name,
    ingredients: ingredients
  })
  .done(onSuccess)
  .error(onError);
});