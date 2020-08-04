var Robot = require('../models/robot');

module.exports = {
  getRobots,
  addRobot,
  updateRobot,
  deleteRobot
};

//get ALL robots
async function getRobots(req, res) {
  const robots = await Robot.find({});
  res.status(201).json(robots);
}

//create new robots
async function addRobot(req, res) {
  try {
    console.log(req.body);
    await Robot.create(req.body);
    getRobots(req, res);
  } catch (err) {
    res.json({err});
  }
}

//update specific robot
async function updateRobot(req, res) {
  try {
    const robot = await Robot.findById(req.params.id);
    // if we passed the user's id, it means we're trying to favorite the robot
    if (req.body.userId) {
      const userId = req.body.userId;
      // remove user if from robot's FavoriteBy array if already in there
      if (!robot.favoritedBy.includes(userId)) robot.favoritedBy.push(userId);
      else {
        // add user id to robot's FavoritedBy array
        for (let i=0; i<robot.favoritedBy.length; i++) {
          if (robot.favoritedBy[i] == userId) robot.favoritedBy.splice(i, 1);
        }
      }
    }
    // otherwise, we're just getting it approved
    else {
      robot.approved = true;
    }
    await robot.save();
    getRobots(req, res);
  } catch (err) {
    res.json({err});
  }
}

async function deleteRobot(req, res) {
  try {
    await robot.findByIdAndDelete(req.params.id);
    getRobots(req, res);
  } catch (err) {
    res.json(err);
  }
}

