require('dotenv').load()
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');
var FacebookStrategy = require('passport-facebook');
var passport = require('passport');
// var twilio = require('twilio');
// var accountSid = TWILIO_ACCOUNT_SID;
// var authToken = TWILIO_AUTH_TOKEN;
var client = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);


var pg = require('pg');
var conString = process.env.DATABASE_URL || "postgres://@localhost/theriverreport";


var routes = require('./routes/index');
var users = require('./routes/users');
// var twilio = require('./routes/twilio')

// var cors = require('cors');
var bodyParser = require('body-parser');


var app = express();
// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieSession({
  name: process.env.COOKIE_SESSION_NAME,
  keys: [process.env.KEY1, process.env.KEY2]
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.HOST + "/auth/facebook/callback",
    enableProof: false,
    profileFields: ['id', 'displayName', 'link', 'photos', 'email']
  },
  function(accessToken, refreshToken, profile, done) {
  
    var fullName = profile.displayName.split(" "),
        userFirstName = fullName[0],
        userLastName = fullName[1]

    pg.connect(conString, function(err, client, done) {
      if (err) return console.error('error fetching client from pool', err);
      client.query("SELECT * FROM users WHERE facebookid = $1;", [profile.id], function (err, result) {
        if(result.rows.length==0){
          client.query("INSERT INTO users (firstname, lastname, facebookid) VALUES ($1, $2, $3) RETURNING id;", [userFirstName, userLastName, profile.id]);
        }
        if (err) return console.error('error running query', err);
        console.log("connected to theRiverReport database");
      })
    });
    return done(null, { facebookId: profile.id, firstName: userFirstName, lastName: userLastName, token: accessToken });
  }
));

app.post('/twilio', function(req, res){
  
client.messages.create({
    to:'+15303860690',
    from:'+17754130349',
    body:'Gore Canyon is in!'
}, function(error, message) {
    if (error) {
        console.log(error.message);
    }
  });
});

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

app.get('/auth/facebook',
  passport.authenticate('facebook'));

app.get('/logout', function(req, res){
  req.session = null;
  req.logout();
  res.redirect('/');
});

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.use(passport.session());

app.use(function(req, res, next){
  res.locals.user = req.user
  next()
})
app.use('/', routes);

// app.use('/twiliotest', twilio)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});



module.exports = app;
