var $form = $("#twote-form");

////////////////////////////////////////////////////////////////////////////////
//These duplicate the text created by the original page load for the new twote//
////////////////////////////////////////////////////////////////////////////////
var onTwoteSuccess = function(data, status) {
  twoteList = document.getElementById("twotelist")
  $form.find("input[name=twoteText]").val("")
  twote = createTwoteHTML(data)
  twoteList.insertBefore(twote, twoteList.childNodes[0])
  
  //This binds the deleteTwote stuff to the new button
  //I want a better way, but I don't really know one.
  $("button[class=twoteDeleteButton]").click(function(){
  username = getCookie("twoterCookie")
  $.get("/deleteTwote", {'id':this.id, 'username':username, 'password':'password'})
    .done(onDeleteSuccess)
    .error(onDeleteError)
  });
};

var createTwoteHTML = function(twote) {
  var twoteDiv = document.createElement("div")
  twoteDiv.id = twote._id;
  twoteDiv.className = "twote";
  twoteDiv.setAttribute('user', twote.user);
  html = twote.text + "<br>";
  html += "-" + twote.user;
  html += ('<button type="button" id="'+twote._id+'" class="twoteDeleteButton" user="'+twote.user+'">Delete</button>');
  twoteDiv.innerHTML = html;
  console.log(twoteDiv)
  return twoteDiv
};

var onTwoteError = function(data, status) {
  console.log("status", status);
  console.log("error", data);
};
////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////
//This is to get the username to put on the Twotes//
////////////////////////////////////////////////////
function setCookie(cname, cvalue, exdays) {
	//Borrowed from TutorialsPoint
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires + "path=\\";
}

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
  username = getCookie("twoterCookie");
  $("div[class=currentUser]").html("-"+username);
}();

//This bit connects the login/logout button
username = getCookie("twoterCookie");
if (!username) {
  $("button[class='loginButton']").click(function(){
  	window.location = "/login"
  });
}
else {
  $("button[class='loginButton']").html("logout");
  $("button[class='loginButton']").click(function(){
  	//Removing all delete buttons for twotes
  	$("button[class='twoteDeleteButton']").each(function(){
  	console.log("Disabling buttons")
  	$(this).prop("disabled",true)
    });
    //Preparing button for login function
    setCookie("twoterCookie", "Nobody", -1);
    $form.html("Please Login");
    $(this).html("login")
    $(this).click(function(){
  	  window.location = "/login"
    });
  })
}


////////////////////////////////////////////////////


///////////////////////////////////
//This hooks up the delete button//
//   And a couple other things   //
///////////////////////////////////

var onDeleteSuccess = function(data, status){
  if (data.deleted == true){
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
  username = getCookie("twoterCookie")
  $.get("/deleteTwote", {'id':id, 'username':username, 'password':'password'})
    .done(onDeleteSuccess)
    .error(onDeleteError)
}

$("button[class=twoteDeleteButton]").click(function(){
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

///////////////////////////////////
// Here we have name highliting  //
///////////////////////////////////
var clicked = null;
//Track with thing is clicked
$("div[class=user]").click(function(){
  if ($(this).attr("id") == clicked){
    $("div[class='clicked']").each(function(){
      $(this).prop('class', 'twote');
    })
    clicked = null;
  }
  else{
  	//Undo Previous click
  	$("div[class='clicked']").each(function(){
      $(this).prop('class', 'twote');
    });
    $("div[user='"+$(this).attr("id")+"']").each(function(){
      $(this).prop('class', 'clicked');
    });
    clicked = $(this).attr("id");
  }
});
///////////////////////////////////

//This allows the user to easily submit a new twote
$form.submit(function(event) {
  event.preventDefault();
  twote = $form.find("input[name=twoteText]").val()
  user = getCookie("twoterCookie")
  $.get("/postTwote", {'text':twote, 'user':user
  })
    .done(onTwoteSuccess)
    .error(onTwoteError);
});