import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
// import logger from 'morgan';
import ejs from 'ejs';
import csrf from 'csurf';
import session from 'express-session';
import http from 'http';
import indexRouter from './routes/index';
import usersRouter from './routes/users';
import tokenRouter from './routes/token';
import intensiveRouter from './routes/intensive';

const app = express();
// eslint-disable-next-line no-underscore-dangle
const __dirname = path.resolve();
const port = process.env.PORT || '3000';

// view engine setup
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

app.use(
  session({
    name: 'whale',
    secret: 'AI34WsAkSN@%RuYhvjoX2G',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 3 * 60 * 60 * 1000,
      sameSite: 'strict',
      httpOnly: true,
    },
  }),
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
app.use('/concentrations', intensiveRouter);

app.set('port', port);
const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
