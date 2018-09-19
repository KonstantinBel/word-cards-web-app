const express = require('express')
const router = express.Router()
const passport = require('passport')

const authControllers = require('../../controllers/auth-controllers')

router.post('/signup', authControllers.signup)
router.post('/signin', authControllers.signin)
router.post('/signout', authControllers.signout)
router.get('/check', authControllers.checkUser)

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
router.get('/google/callback', authControllers.googleCallback)

module.exports = router
