var $userform = $("#user-form");

function setCookie(cname, cvalue, exdays) {
	//Borrowed from TutorialsPoint
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires + "path=\\";
}

var onSuccess = function(data, status) {
  console.log(data)
  setCookie("twoterCookie", data.username, 1)
  console.log("User Logged in")
  window.location = "/";
};

var onError = function(data, status) {
  console.log("status", status);
  console.log("error", data);
};

$userform.submit(function(event) {
  event.preventDefault();
  console.log("User Login Attempted");
  username = $userform.find("input[name=userNameLogin]").val();
  console.log("Username found.")
  console.log(username)
  $.get("/userLogin", {'username':username})
    .done(onSuccess)
    .error(onError);
});