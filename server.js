var express = require ('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');

var Sneaker = require('./models/sneakers');

var index = require('./routes/index');
var sneakers = require('./routes/sneakers');

const ENV = require('./app-env.js');
const googleClientKey    = ENV.GOOGLE_CLIENT_ID;
const googleClientSecret = ENV.GOOGLE_CLIENT_SECRET;

const User = require('./models/users');
const passport = require('passport');


const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

//Middleware
app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('tiny'));
app.set('view engine', 'ejs');

app.use('/', index);
app.use('/sneakers', sneakers);

//Passport Middleware
// we need cookieParser middleware to handle Sessions
app.use(cookieParser());
app.use(bodyParser());
// here we set up sessions, and add a string to our secret. This string will be used to hash our session token.
app.use(expressSession({ secret: 'MySecretKEY' }));
app.use(passport.initialize());
app.use(passport.session());


mongoose.connect('mongodb://localhost/sneakercloset', () => {
  console.log('DB Connection Established')
});

passport.use(new GoogleStrategy({
    clientID: googleClientKey,
    clientSecret: googleClientSecret,
    callbackURL: "http://www.localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
       User.findOrCreate({ googleId: profile.id }, function (err, user) {
         return done(err, user);
       });
  }
));

app.get('/auth/google', passport.authenticate('google', { scope: "email" }));

app.get('/auth/google/callback',
      passport.authenticate('google', { successRedirect: '/',
        failureRedirect: '/' }));

        // Logout
app.get("/logout", function(req, res){
  req.logout();
  res.redirect("/")
});

app.get('/', function(req, res){
  res.render('layout', {user: req.user});
});



//**ROUTES**

//This is "homepage", sent to routes index.js
// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/views/index.html');
// });

// saves to database to post..
// app.post('/user/:id/shoe/new', (req, res) => {
//   db.collection('sneakers').save(req.body, (err, result) => {
//     if (err) return console.log(err)
//
//     console.log('saved to database')
//     res.redirect('/user/:id/shoe/new')
//   });
// });

//renders to page "index.ejs"
// app.get('/user/:id/shoe/new', (req, res) => {
//   db.collection('sneakers').find().toArray(function(err, result) {
//     if (err) return console.log(err);
//     res.render('index.ejs', {sneakers: result})
//   });
// });



app.listen(3000, () => {
  console.log("What's Gucci?");
});
