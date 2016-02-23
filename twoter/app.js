var exphbs = require('express-handlebars');
var express = require('express');
var index = require('./routes/index');
var app = express();
var path = require('path');
var passport = require('passport');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var FacebookStrategy = require('passport-facebook').Strategy;
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var mongoose = require('mongoose');
var auth = require('./auth')

mongoose.connect('mongodb://localhost/twoter');
var User = require("./models/userModel");


app.use(session({ 
  secret: 'Yo. A secret.',
  cookie:{},
  resave: false,
  saveUninitialized: false }));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());


//All Basic Twoter functions (all get requests, because I didn't know better,
//and I'm not going to fix it right now)
app.get('/', index.home);
app.get('/postTwote', index.postTwote)
app.get('/login', index.login)
app.get('/deleteTwote', index.deleteTwote)

// //Facebook login code
app.get('/auth/facebook',
  passport.authenticate('facebook'),
  function(req, res){});
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
  	console.log("Req.body is:")
  	console.log(req.body)
    res.redirect('/');
});

app.get('/auth/local',
  passport.authenticate('local'),
  function(req, res){
  	res.send();
 });

app.get('/currentUser', function(req, res){
	console.log("Getting current user.")
	if (!req.user) { //returns undefined if not logged in
	  console.log("No user.")
      res.send(null)
	}
	else{
	  console.log("User")
	  console.log(req.user)
      res.send(req.user)
	}
})

app.get('/logout', function(req, res){
	console.log(req.body)
	console.log("Server side logout reached.")
	req.logout();
	res.send()
})
app.get('/twoteList', function(req,res){ensureAuthenticated(req, res, index.twoteList)});

//I couldn't quite figure out how to move the passport
//stuff out of app.js, and I'm already late. It works, at least.
//
// serialize and deserialize users
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new FacebookStrategy({
  clientID: auth.FACEBOOK_APP_ID,
  clientSecret: auth.FACEBOOK_APP_SECRET,
  callbackURL: auth.FACEBOOK_CALLBACK_URL,
  profileFields: ['id', 'displayName', 'photos', 'email']
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({ name: profile.displayName }, function(err, user) {
      if(err) {
        console.log(err);  // handle errors!
      }
      if (!err && user !== null) {
        done(null, user);
      } else {
      	//If this facebook user hasn't logged in before
      	//Create a user for them
        user = new User({
          name: profile.displayName,
          password: null
        });
        user.save(function(err) {
          if(err) {
            console.log(err);  // handle errors!
          } else {
            console.log("saving user ...");
            done(null, user);
          }
        });
      }
    });
  }
));

passport.use(new LocalStrategy(
  {username:'name'},
  function(username, password, done) {
  	console.log("Authenticating User")
  	console.log(username)
  	console.log(password)
    User.findOne({ name: username }, function (err, user) {
      if (err) { return done(err); }
      else if (!user) {
      	//If this normal user hasn't logged in before
      	//Create a user for them
        user = new User({
          name: username,
          password: password
        });
        user.save(function(err) {
          if(err) {
            console.log(err);  // handle errors!
          } else {
            console.log("saving user ...");
            return done(null, user);
          }
        });
      }
      else if (user.password !== password) { return done(null, false); }
      else {
      console.log("Successful login.")
      return done(null, user);
      }
    });
  }
));



// test authentication
var ensureAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) { return next(req, res); }
  res.status(401);
}

app.listen(3000);