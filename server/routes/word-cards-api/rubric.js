const express = require('express');
const rubricCon = require('../../controllers/rubric');
const { permissions } = require('../../middlewares');

const router = express.Router();
const { siteEditorAccess } = permissions;

router.post('/get', rubricCon.get);
router.post('/add', siteEditorAccess, rubricCon.add); // {"names": ["rubric name", ...]}
router.post('/edit', siteEditorAccess, rubricCon.edit); // {"id": "1", "name": "rubric"}
router.post('/remove', siteEditorAccess, rubricCon.remove); // {"id": 1} || {"ids": ["1", "2", ...]}

module.exports = router;
