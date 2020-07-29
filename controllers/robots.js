var Robot = require('../models/robot');

module.exports = {
  getRobots,
  addRobot,
  updateRobot
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
    getRobots(req, res);
  } catch (err) {
    res.json({err});
  }
}

//update specific robot
async function updateRobot(req, res) {
  try {
    const robot = await Robot.findById(req.params.id);
    const userId = req.body.userId;
    // remove user if from robot's FavoriteBy array if already in there
    if (!robot.favoritedBy.includes(userId)) robot.favoritedBy.push(userId);
    else {
      // add user id to robot's FavoritedBy array
      for (let i=0; i<robot.favoritedBy.length; i++) {
        if (robot.favoritedBy[i] == userId) robot.favoritedBy.splice(i, 1);
      }
    }
    await robot.save();
    getRobots(req, res);
  } catch (err) {
    res.json({err});
  }
}

