const passport = require('passport')
const db = require('../models')
const ResponseError = require('../lib/response-error')

exports.signup = function (req, res, next) {
  let sourceName = 'authController.signup'
  let {username, email, password, passwordConf} = req.body

  if (!username ||
      !email ||
      !password ||
      !passwordConf) {
    return next(new ResponseError({
      type: 'error',
      message: 'required field is not filled',
      source: sourceName,
      status: 400
    }))
  }

  if (password !== passwordConf) {
    return next(new ResponseError({
      type: 'error',
      message: 'passwords do not match',
      source: sourceName,
      status: 400
    }))
  }

  db.User.create({
    local_name: username,
    email: email,
    password: password
  })
    .then(() => {
      res.send({
        type: 'ok',
        message: 'new user created',
        arg: {username: username}
      })
    })
    .catch(err => {
      if (err.name && err.name === 'SequelizeUniqueConstraintError') {
        if (err.fields.email) {
          return next(new ResponseError({
            type: 'error',
            message: 'duplicate email',
            arg: email,
            source: sourceName,
            status: 400
          }))
        }
        if (err.fields.local_name) {
          return next(new ResponseError({
            type: 'error',
            message: 'duplicate username',
            arg: username,
            source: sourceName,
            status: 400
          }))
        }
      }

      return next(new Error(err.message))
    })
}

exports.signin = function (req, res, next) {
  let sourceName = 'authController.signin'
  let {email, password} = req.body

  if (!email ||
  !password) {
    return next(new ResponseError({
      type: 'error',
      message: 'required field is not filled',
      source: sourceName,
      status: 400
    }))
  }

  passport.authenticate('local', function (err, user, info) {
    if (err) { return next(err) }
    if (!user) {
      return next(new ResponseError({
        type: 'error',
        message: info,
        source: sourceName,
        status: 401
      }))
    }
    req.logIn(user, function (err) {
      if (err) { return next(err) }
      return res.send({
        type: 'ok',
        message: 'login seccessful',
        arg: {username: user.local_name}
      })
    })
  })(req, res, next)
}

exports.signout = function (req, res, next) {
  req.session.destroy(() => {})
  req.logout()
  res.send({type: 'ok', message: 'logout seccessful'})
}

exports.checkUser = function (req, res, next) {
  let name = null

  if (req.isAuthenticated()) {
    name = req.user.local_name || req.user.google_name
  }

  res.send({
    type: 'ok',
    message: 'checked',
    isAuth: !!name,
    arg: {username: name}})
}

exports.googleCallback = function (req, res, next) {
  let sourceName = 'authController.googleCallback'
  passport.authenticate('google', function (err, user, info) {
    if (err) return next(err)
    if (!user) {
      return next(new ResponseError({
        type: 'error',
        message: info,
        source: sourceName,
        status: 401
      }))
    }
    req.logIn(user, function (err) {
      if (err) { return next(err) }
      return res.redirect('/')
    })
  })(req, res, next)
}
