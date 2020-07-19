var Robot = require('../models/robot');

module.exports = {
  getRobots,
  addRobot
};

//get ALL robots
async function getRobots(req, res) {
  const robots = await Robot.find({});
  res.status(201).json(robots);
}

//create new robots
async function addRobot(req, res) {
  try {
    await Robot.create(req.body);
    // Use the highScores action to return the list
    index(req, res);
  } catch (err) {
    res.json({err});
  }
}

