const express = require('express');
const path = require('path');

const router = express.Router();

router.use(express.static(path.join(global.PROJECT_DIR, '/client/build')));
router.use(/\//, (req, res) => {
  res.render('main-page.pug', { devMode: res.locals.devMode });
});

router.use('/example-static-page', (req, res) => {
  res.render('example-static-page.pug', { devMode: res.locals.devMode });
});

router.use(express.static(path.join(global.PROJECT_DIR, '/word-cards-app/build')));
router.use('/word-cards-app', (req, res) => {
  res.sendFile(path.join(global.PROJECT_DIR, '/word-cards-app/build/index.html'));
});

router.use(express.static(path.join(global.PROJECT_DIR, '/react-road-app/build')));
router.use('/react-road-app', (req, res) => {
  res.sendFile(path.join(global.PROJECT_DIR, '/react-road-app/build/index.html'));
});

module.exports = router;
