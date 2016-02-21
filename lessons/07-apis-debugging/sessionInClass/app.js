var express = require("express"),
  path = require("path"),
  passport = require('passport');
  FacebookStrategy = require('passport-facebook').Strategy;
  handlebars = require('express-handlebars'),
  bodyParser = require('body-parser'),
  session = require('express-session');
  index = require('./routes/index')
  auth = require('./auth')
  mongoose = require('mongoose')

var app = express();
mongoose.connect('mongodb://localhost/twoter');
var User = require("./models/userModel");


app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('handlebars', handlebars({defaultLayout: 'main'}));

passport.use(new FacebookStrategy({
	//This is required to access facebook
    clientID: auth.FACEBOOK_APP_ID,
    clientSecret: auth.FACEBOOK_APP_SECRET,
    callbackURL: auth.FACEBOOK_CALLBACK_URL
  },
  //This function accesses the database to check for a user, and is
  // called whenever FacebookStrategy needs it
  function(accessToken, refreshToken, profile, done) {
  	console.log("entering user function")
  	//Search database for user with same display name (same as ID, for this app)
    User.findOne({ name: profile.displayName }, function(err, user) {
      if(err) {
        console.log(err);  // handle errors!
      }
      console.log("Finished looking for users")
      if (!err && user !== null) {
        done(null, user);
      } else {
      	//If this facebook user hasn't logged in before
      	//Create a user for them
      	console.log("creating a new user")
        user = new User({
          name: profile.displayName,
          password: null
        });
        //Save the new user to the database. Yay.
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

passport.serializeUser(function(user, done) {
  console.log("Serialized user")
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  console.log("Deserialized user")
  done(null, user);
});

app.use(session({ 
  secret: 'this is not a secret ;)',
  cookie:{},
  resave: false,
  saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.set('view engine', 'handlebars');

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/login' })
);

function ensureAuthenticated(req, res, next) {
  console.log("Ensuring authentication")
  if (req.isAuthenticated()) { return next(req, res); }
    res.send("Go to /login");
};

app.get('/', function(req, res){ensureAuthenticated(req, res, index.index)});
app.get('/login', index.login)



app.listen(3000)