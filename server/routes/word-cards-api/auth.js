const express = require('express');
const passport = require('passport');

const router = express.Router();

const authControllers = require('../../controllers/auth-controllers');

router.post('/signup', authControllers.signup);
router.post('/signin', authControllers.signin);
router.post('/signout', authControllers.signout);
router.get('/check', authControllers.checkUser);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', authControllers.googleCallback);

module.exports = router;
