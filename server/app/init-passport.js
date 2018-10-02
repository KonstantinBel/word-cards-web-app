const passport = require('passport')
const bcrypt = require('bcryptjs')
const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const db = require('../models')

console.log('Start passport init')

// config GoogleStrategy
passport.use('google',
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.OAUTH_CALLBACK_URL
    },
    function (accessToken, refreshToken, profile, done) {
      db.User.findOne({
        where: { google_id: profile.id }
      })
        .then(user => {
          if (user) return user
          return db.User.create({
            google_id: profile.id,
            google_token: accessToken,
            google_name: profile.displayName,
            email: profile.emails[0].value
          })
        })
        .then(user => {
          user && done(null, user)
        })
        .catch(err => done(new Error(err.message)))
    }
  )
)

// config LocalStrategy
passport.use('local',
  new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function (email, password, done) {
    let user

    db.User.findOne({
      where: { email: email }
    })
      .then(res => {
        if (!res) throw (new Error('user not found'))
        user = res
        return bcrypt.compare(password, user.password)
      })
      .then(isComare => {
        if (!isComare) throw (new Error('incorrect password'))
        return done(null, user)
      })
      .catch(err => {
        if (err.message === 'user not found') return done(null, false, 'user not found')
        if (err.message === 'incorrect password') return done(null, false, 'incorrect password')
        console.log(err.stack)
        return done(err)
      })
  })
)

passport.serializeUser(function (user, done) {
  if (user) done(null, user.user_id)
})

passport.deserializeUser(function (id, done) {
  db.User.findOne({where: {user_id: id}})
    .then(user => done(null, user))
    .catch(err => done(err, false))
})
