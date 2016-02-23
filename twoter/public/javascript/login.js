var $userform = $("#user-form");

var onSuccess = function(data, status) {
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
  password = $userform.find("input[name=passwordLogin]").val();
  console.log("Username found.")
  console.log(username)
  $.get("/auth/local", {'username':username, 'password':password})
    .done(onSuccess)
    .error(onError);
});

$("button[class=facebookLoginButton]").click(function(){
  window.location = "/auth/facebook";
})