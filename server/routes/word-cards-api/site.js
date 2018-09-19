const express = require('express')
const router = express.Router()

const isAuth = require('../../middlewares/check-auth')
const siteControllers = require('../../controllers/site-controllers')

router.get('/profile', isAuth(), siteControllers.profile)
router.get('/admin-page', isAuth(['admin', 'moderator']), siteControllers.adminPage)
router.get('/public-page', siteControllers.publicPage)

module.exports = router
