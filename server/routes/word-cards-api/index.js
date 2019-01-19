const express = require('express');

const router = express.Router();

router.use('/rubric', require('./rubric'));
router.use('/deck', require('./deck'));
router.use('/auth', require('./auth'));
router.use('/site', require('./site'));

module.exports = router;
