import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import ejs from 'ejs';
import csrf from 'csurf';
import indexRouter from './routes/index';
import usersRouter from './routes/users';
import tokenRouter from './routes/token';
import session from 'express-session';
import http from 'http';

const app = express();
const __dirname = path.resolve();
const port = process.env.PORT || '3000';

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


app.set('port', port);
const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
