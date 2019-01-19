const express = require('express');
const siteControllers = require('../../controllers/site-controllers');
const { permissions } = require('../../middlewares');

const router = express.Router();
const { adminAccess, userAccess } = permissions;

router.get('/profile', userAccess, siteControllers.profile);
router.get('/admin-page', adminAccess, siteControllers.adminPage);
router.get('/public-page', siteControllers.publicPage);

module.exports = router;
