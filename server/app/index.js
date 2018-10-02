const fs = require('fs')
const path = require('path')
const express = require('express')
const app = express()
const session = require('express-session')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const logger = require('morgan')
const accessLogStream = fs.createWriteStream(path.join(__dirname, '../access.log'), {flags: 'a'})
const nocache = require('nocache')
const favicon = require('serve-favicon')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const db = require('../models')
const passport = require('passport')
const ResponseError = require('../lib/response-error')

db.init().then(() => {
  console.log('Start app init')

  // test query
  // db.Rubric.findById(1)
  //   .then(rubric => rubric.getDescs())
  //   .then(descs => {console.log(descs);})

  // init passport strategis
  require('./init-passport')

  // init viwes engine
  app.set('views', path.join(__dirname, '../../client/src/views/'))
  app.set('view engine', 'pug')

  // inti app middlewares
  app.use(cookieParser())
  global.DEV && app.use(nocache())
  global.DEV || app.use(logger('combined', {stream: accessLogStream}))
  global.DEV && app.use(logger('dev'))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    store: new SequelizeStore({
      db: db.sequelize
    }),
    cookie: {
      maxAge: 3600000
    }
  }))
  app.use(passport.initialize())
  app.use(passport.session())
  app.use(favicon(path.join(__dirname, '../../client/build/img', 'favicon.ico')))
  app.use(express.static(path.join(__dirname, '../../client/build')))
  app.use((req, res, next) => {
    res.locals.devMode = 'global.DEV'
    next()
  })
  app.use('/api', require('../routes/word-cards-api'))
  app.use('/', require('../routes/static'))

  // catch 404
  app.use((req, res, next) => {
    var err = (new ResponseError({
      type: 'error',
      message: 'page not found',
      agrs: { url: req.url },
      status: 404
    }))
    next(err)
  })

  // error handling
  app.use((err, req, res, next) => {
    // console output
    if (err instanceof ResponseError) {
      err.print()
    } else {
      console.log('\n---------unexpected_error--------') 
      console.log(err.stack + '\n----------------------------\n')
    }

    // response
    if (err.status == '404') {
      res.render('page-404.pug', { devMode: res.locals.devMode })
    }
    else {
      let status = err.status || 500
      res.status(status)
      res.send(err.details || {
        type: 'unknown server error',
        status: global.DEV && status,
        messae: global.DEV && err.message,
        stack: global.DEV && err.stack
      })
    }
  })
})

module.exports = app
