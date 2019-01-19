const express = require('express');
const deckCon = require('../../controllers/deck');
const { permissions } = require('../../middlewares');

const router = express.Router();
const { siteEditorAccess } = permissions;

router.post('/get', siteEditorAccess, deckCon.get); // {"name": "...", "level": 1, "type": "...", "rubricId": 1, "userId": 1}

module.exports = router;
