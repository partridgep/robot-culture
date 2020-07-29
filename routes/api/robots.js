const express = require('express');
const router = express.Router();
const robotsCtrl = require('../../controllers/robots');

// GET /api/robots
router.get('/', robotsCtrl.getRobots);

// POST /api/robots
router.post('/', robotsCtrl.addRobot);

// PUT /api/robots/:id
router.put('/:id', robotsCtrl.updateRobot)

module.exports = router;
