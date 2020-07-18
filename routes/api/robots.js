const express = require('express');
const router = express.Router();
const robotsCtrl = require('../../controllers/robots');

router.get('/', robotsCtrl.index);
router.post('/', robotsCtrl.create);

module.exports = router;
