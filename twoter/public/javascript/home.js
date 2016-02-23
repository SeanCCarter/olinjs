var $form = $("#twote-form");



////////////////////////////////////////////////////////////////////////////////
//These duplicate the text created by the original page load for the new twote//
//It also loats all twotes initially, depending on whether someone's logged in//
////////////////////////////////////////////////////////////////////////////////
var onTwoteSuccess = function(data, status) {
  twoteList = document.getElementById("twotelist")
  $form.find("input[name=twoteText]").val("")
  twote = createTwoteHTML(data)
  twoteList.insertBefore(twote, twoteList.childNodes[0])
  
  //This binds the deleteTwote stuff to the new button
  //I want a better way, but I don't really know one.
  $("button[class=twoteDeleteButton]").click(function(){
    id = $(this).attr('id')
    $.get("/currentUser").done(function(data, status){
      $.get("/deleteTwote", {'id':id, 'username':data.name, 'password':'password'})
      .done(onDeleteSuccess)
      .error(onDeleteError)
      });
    })
};

function populateTwotes(){
  $.get("/twoteList")
    .done(function(data, status){
      if (status != 401){
        for(i=0;i<data.length;i++){
          $("#twotelist").append(createTwoteHTML(data[i]));
        }
      connectDeleteButtons();
      disableNecessaryButtons();
      }
    })
    .error(onTwoteError)
};

function createTwoteHTML(twote) {
  var twoteDiv = document.createElement("div")
  twoteDiv.id = twote._id;
  twoteDiv.className = "twote";
  twoteDiv.setAttribute('user', twote.user);
  console.log(twoteDiv.getAttribute("user"))
  html = twote.text + "<br>";
  html += "-" + twote.user;
  html += ('<button type="button" id="'+twote._id+'" class="twoteDeleteButton" user="'+twote.user+'">Delete</button>');
  twoteDiv.innerHTML = html;
  return twoteDiv
};

var onTwoteError = function(data, status) {
  console.log("Twote related error")
  console.log("status", status);
  console.log("error", data);
};
////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////
//This is to get the username to put on the Twotes//
////////////////////////////////////////////////////
function setUsername(){
  //Sets the username on the Twote form HTML
  $.get("/currentUser").done(function(data, status){
    if (data.name){
      $("div[class=currentUser]").html("-"+data.name);
    }
    else {
      //Overwrites twote form to discourage entry of 
      // invalid twotes
      $form.html("Please Login");
    }
  })
};


//This bit connects the login/logout button
$.get("/currentUser", function(data, status){
  if (!data.name) {
    //If you aren't logged in:
    $("button[class='loginButton']").click(function(){
      window.location = "/login"
    });
  }
  else {
    //If you are logged in
    $("button[class='loginButton']").html("logout");
    //Removing all delete buttons for twotes
    console.log("It does work here.")
    console.log($("button[class='twoteDeleteButton']"))
    // $("button[class='twoteDeleteButton']").each(function(){
    //   $(this).prop("disabled",true)
    // });

    //Creating the Logout button
    $("button[class='loginButton']").click(function(){
      $.get("/logout").done(function(data, status) {console.log("Loggout successful."); $("div[class='twote']").remove();});
      //Preparing button for login function
      
      //Changes the login/logout button to login
      $form.html("Please Login");
      $(this).html("login")
      $(this).click(function(){
        window.location = "/login"
      });
    })
  }
});


////////////////////////////////////////////////////

// Needs to be done on webpage load
populateTwotes(); //Checks login: if you are, lists twotes
setUsername();

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

function connectDeleteButtons(){
  $("button[class=twoteDeleteButton]").click(function(){
    id = $(this).attr("id")
    console.log("Delete activated.")
    console.log($(this).id)
    $.get("/currentUser", function(data, status){
      console.log("Current user retrieved.")
      console.log({'id':id, 'username':data.name, 'password':'password'})
      $.get("/deleteTwote", {'id':id, 'username':data.name, 'password':'password'})
      .done(onDeleteSuccess)
      .error(onDeleteError)
    });
  })
}

//Disables delete buttons once twotes are loaded
function disableNecessaryButtons(){
  $.get("/currentUser", function(data, status){
  console.log("Wokrs here. Has to.")
  console.log($("button[class=twoteDeleteButton]"))
  $("button[class=twoteDeleteButton]").each(function(){
    if($(this).attr("user") == data.name){
      $(this).prop("disabled",false)
    }
    else{
      $(this).prop("disabled",true)
    }
  });
})}

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
  console.log("Submitting twote form.")
  event.preventDefault();
  twote = $form.find("input[name=twoteText]").val()
  console.log(twote)
  $.get("/currentUser").done(function(data, status){
    postTwote(twote, data.name)
  });
});

var postTwote = function(twote, user){
  $.get("/postTwote", {'text':twote, 'user':user
  })
    .done(onTwoteSuccess)
    .error(onTwoteError);
}