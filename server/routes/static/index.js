var express = require('express')
var router = express.Router()

router.use('/word-cards-app', (req, res, next) => {
  res.render('word-cards-app.pug', { devMode: res.locals.devMode })
})

router.use('/example-static-page', (req, res) => {
  res.render('example-static-page.pug', { devMode: res.locals.devMode })
})

router.use(/\//, (req, res) => {
  res.render('main-page.pug', { devMode: res.locals.devMode })
})

module.exports = router
