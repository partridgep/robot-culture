const express = require('express');
const router = express.Router();
const robotsCtrl = require('../../controllers/robots');

// GET /api/robots
router.get('/', robotsCtrl.getRobots);

// POST /api/robots
router.post('/', robotsCtrl.addRobot);

module.exports = router;
