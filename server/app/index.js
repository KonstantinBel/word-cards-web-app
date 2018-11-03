const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');

const accessLogStream = fs.createWriteStream(path.join(global.PROJECT_DIR, '/server/access.log'), { flags: 'a' });
const nocache = require('nocache');
const favicon = require('serve-favicon');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const passport = require('passport');
const db = require('../models');
const ResponseError = require('../lib/response-error');
const initPassport = require('./init-passport');

const wordCardsApiRoute = require('../routes/word-cards-api');
const staticRoute = require('../routes/static');

db.init().then(() => {
  console.log('Start app init');

  // test query
  // db.Rubric.findByPk(1)
  //   .then(rubric => rubric.getDescs())
  //   .then(descs => {console.log(descs);})

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
  app.use((req, res, next) => {
    res.locals.devMode = global.DEV_MODE;
    next();
  });
  app.use('/api', wordCardsApiRoute);
  app.use('/', staticRoute);

  // catch 404
  app.use((req, res, next) => {
    const err = (new ResponseError({
      type: 'error',
      message: 'page not found',
      agrs: { url: req.url },
      status: 404,
    }));
    next(err);
  });

  // error handling
  app.use((err, req, res, next) => {
    // console output
    if (err instanceof ResponseError) {
      err.print();
    } else {
      console.log('\n---------unexpected_error--------');
      console.log(`${err.stack}  \n----------------------------\n`);
    }

    // response
    if (err.status === '404') {
      res.render('page-404.pug', { devMode: res.locals.devMode });
    } else {
      const status = err.status || 500;
      res.status(status);
      res.send(err.details || {
        type: 'unknown server error',
        status: global.DEV_MODE && status,
        messae: global.DEV_MODE && err.message,
        stack: global.DEV_MODE && err.stack,
      });
    }

    next();
  });
});

module.exports = app;
