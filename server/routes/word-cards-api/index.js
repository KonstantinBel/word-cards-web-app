var express = require('express')
var router = express.Router()

router.use('/auth', require('./auth'))
router.use('/site', require('./site'))

module.exports = router
