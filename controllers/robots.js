var Robot = require('../models/robot');

module.exports = {
  index,
  create
};

//get ALL robots
async function index(req, res) {
  const robots = await Robot.find({});
  res.json(scores);
}

//create new robots
async function create(req, res) {
  try {
    await Robot.create(req.body);
    // Use the highScores action to return the list
    index(req, res);
  } catch (err) {
    res.json({err});
  }
}

