const express = require('express');

const router = express.Router();

router.use('/auth', require('./auth'));
router.use('/site', require('./site'));
router.use('/get-locale', require('../../controllers/locale'));

module.exports = router;
