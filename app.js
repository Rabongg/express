import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
// import logger from 'morgan';
import ejs from 'ejs';
import csrf from 'csurf';
import session from 'express-session';
import http from 'http';
import redis from 'redis';
import connectRedis from 'connect-redis';
import dotenv from 'dotenv';
import passport from 'passport';
import passportConfig from './service/passport';
import indexRouter from './routes/index';
import usersRouter from './routes/users';
import tokenRouter from './routes/token';
import intensiveRouter from './routes/intensive';

dotenv.config();

const app = express();
// eslint-disable-next-line no-underscore-dangle
const __dirname = path.resolve();
const port = process.env.PORT || '3000';

// view engine setup
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const RedisStore = connectRedis(session);
const redisClient = redis.createClient({
  host: `${process.env.REDIS_HOST}`,
  port: `${process.env.REDIS_PORT}`,
});

// eslint-disable-next-line no-unused-vars
redisClient.on('connect', (err) => {
  console.log('Connected to redis successfully');
});

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
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
app.use(passport.initialize());
app.use(passport.session());
passportConfig();
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
