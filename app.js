var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// Passport 사용을 위한 설정
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
// Redis 사용을 위한 설정
const redis = require('redis');
const session = require('express-session');
// Redis Session 사용을 위한 연결 정의
let RedisStore = require('connect-redis')(session);
let redisClient = redis.createClient();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
    session({
        store: new RedisStore({ client: redisClient }),
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true
    })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);
// Login, Logout을 수행하는 Router 추가
app.use('/auth', authRouter);

// Login 기능 Test를 위한 User 추가
const testUser = {
  "id": "juyonglee0208",
  "name": "Juyong Lee",
  "password": "0000"
};

// 인증을 위한 Strategies 정의
passport.use(new LocalStrategy(
    function(username, password, done) {
      if(testUser.id != username || testUser.password != password) {
        done(null, false)
      }
      return done(null, testUser);
    }
));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(id, done) {
    // User.findById(id, function(err, user) {
    //     done(err, user);
    // });
    done(null, testUser);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
