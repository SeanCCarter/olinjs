var $templateLi = $('#hidden-template-li');
var $catList = $('#cat-list');
var $catForm = $("#cat-form");
var $newCatForm = $("#newcat-form");

var onSuccess = function(cats, status) {
  $catList.empty()
  for(i=0;i<cats.length;i++) {
    var $newLi = $templateLi.clone();
    $newLi.removeAttr('id');
    $newLi.find('.name').html(cats[i].name);
    $newLi.find('.color').html(cats[i].color);
    $newLi.find('.age').html(cats[i].age);
    $catList.append($newLi);
  }
};

var onError = function(data, status) {
  console.log("status", status);
  console.log("error", data);
};

$catForm.submit(function(event) {
  event.preventDefault();
  $.get("viewCat")
    .done(onSuccess)
    .error(onError);
});

$newCatForm.submit(function(event) {
  event.preventDefault();
  $.get("newCat")
    .done(onSuccess)
    .error(onError);
});

$sortCatsForm.submit(function(event) {
  event.preventDefault();
  var color = $sortCatsForm.find("[name='color']").val();
  $.get("sortCats")
    .done(onSuccess)
    .error(onError);
});

$killCatForm.submit(function(event) {
  event.preventDefault();
  $.get("killCat")
    .done(onSuccess)
    .error(onError);
});