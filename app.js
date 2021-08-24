var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ejs = require('ejs');
var csrf = require('csurf');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const tokenRouter = require('./routes/token');
const session = require('express-session');

var app = express();

// view engine setup
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

app.use(
  session({
    name: 'hellohello',
    secret: 'AI34WsAkSN@%RuYhvjoX2G',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 3 * 60 * 60 * 1000,
      sameSite: 'strict',
      httpOnly: true,
    },
  })
);

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(csrf());
app.use('/', indexRouter);
app.use('/tokens', tokenRouter);
app.use('/users', usersRouter);



/* used for csrf Token*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.error(err);
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
