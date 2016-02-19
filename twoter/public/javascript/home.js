var $form = $("#twote-form");


////////////////////////////////////////////////////////////////////////////////
//These duplicate the text created by the original page load for the new twote//
////////////////////////////////////////////////////////////////////////////////
var onTwoteSuccess = function(data, status) {
  console.log("Twote client contacted server")
  twoteList = document.getElementById("twotelist")
  $form.find("input[name=twoteText]").val("")
  twote = createTwoteHTML(data)
  twoteList.insertBefore(twote, twoteList.childNodes[0])
  console.log($("div[class=" + data._id + "]").val())
  
  //This binds the deleteTwote stuff to the new button
  //I want a better way, but I don't really know how.
  $("button[class=twoteDeleteButton]").click(function(){
  console.log("Deleting twote")
  console.log(this.id)
  username = getCookie("twoterCookie")
  $.get("/deleteTwote", {'id':this.id, 'username':username, 'password':'password'})
    .done(onDeleteSuccess)
    .error(onDeleteError)
  });
};

var createTwoteHTML = function(twote) {
  var twoteDiv = document.createElement("div")
  twoteDiv.class = twote._id
  var twoteItem = document.createElement("li");
  html = twote.text + "<br>";
  html += "-" + twote.user;
  html += ('<button type="button" id="'+twote._id+'" class="twoteDeleteButton" user="'+twote.user+'">Delete</button>');
  twoteItem.innerHTML = html;
  return twoteDiv.appendChild(twoteItem)
};

var onTwoteError = function(data, status) {
  console.log("status", status);
  console.log("error", data);
};
////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////
//This is to get the username to put on the Twotes//
////////////////////////////////////////////////////
function getCookie(cname) {
  //Function from TutorialsPoint
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i=0; i<ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') {c = c.substring(1)};
    if (c.indexOf(name) == 0) {return c.substring(name.length,c.length)};
  }
  return "";
}

var setUsername = function(){
  console.log("Setting Username:")
  username = getCookie("twoterCookie");
  console.log(username);
  $("div[class=currentUser]").html("-"+username);
}();
////////////////////////////////////////////////////


///////////////////////////////////
//This hooks up the delete button//
//   And a couple other things   //
///////////////////////////////////

var onDeleteSuccess = function(data, status){
  if (data.deleted == true){
  	console.log("Twote deleted")
  	$("div[id="+data.id+"]").remove()
  }
  else {
  	console.log("Twote not deleted.")
  }
}

var onDeleteError = function(error, status){
  console.log(error)
}

var deleteTwote = function(id){
  console.log("Deleting twote")
  console.log(id)
  username = getCookie("twoterCookie")
  $.get("/deleteTwote", {'id':id, 'username':username, 'password':'password'})
    .done(onDeleteSuccess)
    .error(onDeleteError)
}

$("button[class=twoteDeleteButton]").click(function(){
  console.log("Deleting twote")
  console.log(this.id)
  username = getCookie("twoterCookie")
  $.get("/deleteTwote", {'id':this.id, 'username':username, 'password':'password'})
    .done(onDeleteSuccess)
    .error(onDeleteError)
});

$("button[class=twoteDeleteButton]").each(function(){
    if($(this).attr("user") == getCookie("twoterCookie")){
  	  $(this).prop("disabled",false)
    }
    else{
  	  $(this).prop("disabled",true)
    }
  }
);
///////////////////////////////////



//This allows the user to easily submit a new twote
$form.submit(function(event) {
  event.preventDefault();
  console.log("Twote submitted")
  twote = $form.find("input[name=twoteText]").val()
  user = getCookie("twoterCookie")
  $.get("/postTwote", {'text':twote, 'user':user
  })
    .done(onTwoteSuccess)
    .error(onTwoteError);
});