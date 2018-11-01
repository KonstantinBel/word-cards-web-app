const express = require('express');

const router = express.Router();
const { checkAuth } = require('../../middlewares');
const siteControllers = require('../../controllers/site-controllers');

router.get('/profile', checkAuth(), siteControllers.profile);
router.get('/admin-page', checkAuth(['admin', 'moderator']), siteControllers.adminPage);
router.get('/public-page', siteControllers.publicPage);

module.exports = router;
