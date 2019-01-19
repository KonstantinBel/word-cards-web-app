const fs = require('fs');
const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const nocache = require('nocache');
const favicon = require('serve-favicon');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const passport = require('passport');
const createLocaleMiddleware = require('express-locale');
const db = require('../models');
const initPassport = require('./init-passport');
const wordCardsApiRoute = require('../routes/word-cards-api');
const staticRoute = require('../routes/static');
const {
  errorHandling,
  catch404,
  setLocale,
  setDevMode,
} = require('../middlewares');

const app = express();
const accessLogStream = fs.createWriteStream(path.join(global.PROJECT_DIR, '/server/access.log'), { flags: 'a' });

db.init().then(() => {
  // init passport strategis
  initPassport();

  // init viwes engine
  app.set('views', path.join(global.PROJECT_DIR, '/client/src/views/'));
  app.set('view engine', 'pug');

  // inti app middlewares
  app.use((req, res, next) => {
    const originCong = global.ACCESS_CONTROL_ALLOW_ORIGIN;
    if (originCong && originCong.indexOf(req.headers.origin) >= 0) {
      res.header('Access-Control-Allow-Origin', req.headers.origin);
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      res.header('Access-Control-Allow-Credentials', 'true');
    }
    next();
  });
  app.use(createLocaleMiddleware());
  app.use(cookieParser());
  if (global.DEV_MODE) app.use(nocache());
  if (!global.DEV_MODE) app.use(logger('combined', { stream: accessLogStream }));
  if (global.DEV_MODE) app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(session({
    secret: global.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    store: new SequelizeStore({
      db: db.sequelize,
    }),
    cookie: {
      maxAge: 3600000,
    },
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(favicon(path.join(global.PROJECT_DIR, '/client/build/img', 'favicon.ico')));

  app.use(setDevMode);
  app.use('/word-cards-api', wordCardsApiRoute);
  app.use(setLocale);
  app.use('/', staticRoute);

  app.use(catch404);
  app.use(errorHandling);
});

module.exports = app;
