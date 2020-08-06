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

    // if passing new updated fields
    if (req.body.updatedFields) {
      console.log('updating')
      console.log(req.body.updatedFields);
      robot.updates.push(req.body.updatedFields);
      }

    // if we passed the user's id, it means we're trying to favorite the robot
    else if (req.body.userId) {
      console.log('favoriting');
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

    //else if approving a change
    else if (req.body.updatedField) {
      if (!req.body.denied) {
        console.log('approving change');
        console.log("updated field is:");
        console.log(req.body.updatedField);
        const updatedField = req.body.updatedField;
        const changedFieldName = Object.keys(updatedField)[0];
        console.log("robot[`${changedFieldName}`]: ");
        console.log(robot[`${changedFieldName}`]);
  
        // if only changing a string property (name, manufacturer, and images)
        if (typeof(updatedField[`${changedFieldName}`]) === 'string') {
          console.log('is a string');
          robot[`${changedFieldName}`] = updatedField[`${changedFieldName}`];
          console.log("new value is:");
          console.log(robot[`${changedFieldName}`]);
        }
        // else if changing height (only object property)
        else if (changedFieldName === 'height') {
          console.log('changing height!');
          robot.height.feet = updatedField.height.feet;
          robot.height.inches = updatedField.height.inches;
        }
        // else if it is an array (media, actors, and categories)
        else if (Array.isArray(updatedField[`${changedFieldName}`])) {
          console.log('is an array!');
          if (req.body.toBeRemoved) {
            console.log('remove this one!');
            for (let i=0; i<robot[`${changedFieldName}`].length; i++) {
              if (robot[`${changedFieldName}`][i] === updatedField[`${changedFieldName}`][0]) {
                console.log('found the one to be removed');
                console.log(robot[`${changedFieldName}`][i]);
                robot[`${changedFieldName}`].splice(i, 1);
              }
            }
          } else {
            // insert new item
            robot[`${changedFieldName}`] = [...robot[`${changedFieldName}`], ...updatedField[`${changedFieldName}`]];
          }
        }
      } 
      //now we need to remove the update object from robot
      robot.updates.splice(req.body.idx, 1);
    }

    // otherwise, we're just getting a new robot approved
    else {
      console.log('approved');
      robot.approved = true;
    }

    // time to save the robot and retrieve all robots again
    await robot.save();
    getRobots(req, res);
  } catch (err) {
    console.log(err);
    res.json({err});
  }
}

async function deleteRobot(req, res) {
  try {
    await Robot.findByIdAndDelete(req.params.id);
    getRobots(req, res);
  } catch (err) {
    res.json(err);
  }
}

