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
      robot.updates.push(req.body.updatedFields);
      }

    // if we passed the user's id, it means we're trying to favorite the robot
    else if (req.body.userId) {
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
      keepThisUpdate = false;
      //console.log(req.body.updatedField);
      // only changing our robot if not denying the change
      if (!req.body.denied) {

        // grab update object from req.body
        // ex: {name: 'New Name'}
        const updatedField = req.body.updatedField;

        // we want to know the name of the property we are changing,
        // which is going to be the first (and only) key of our update object
        const changedFieldName = Object.keys(updatedField)[0];
  
        // if only changing a string property (for name, manufacturer, and images)
        if (typeof(updatedField[`${changedFieldName}`]) === 'string') {
          // replace value with update value
          // ex: robot[name]: 'Old Name' -> robot[name]: 'New Name'
          robot[`${changedFieldName}`] = updatedField[`${changedFieldName}`];
        }
        // else if changing height (it's only object property)
        else if (changedFieldName === 'height') {
          robot.height.feet = updatedField.height.feet;
          robot.height.inches = updatedField.height.inches;
        }
        // else if it is an array (for media, actors, and categories)
        else if (Array.isArray(updatedField[`${changedFieldName}`])) {
          // check if we are removing an item from an array
          if (req.body.toBeRemoved) {
            // if so, iterate through items in robot's array
            for (let i=0; i<robot[`${changedFieldName}`].length; i++) {
              // find matching item and remove
              if (JSON.stringify(robot[`${changedFieldName}`][i]) === JSON.stringify(updatedField[`${changedFieldName}`][0])) {
                robot[`${changedFieldName}`].splice(i, 1);
              }
            }
          } else {
            // insert new item
            robot[`${changedFieldName}`] = [...robot[`${changedFieldName}`], ...updatedField[`${changedFieldName}`]];
          }
          // TODO: if update array contains other remaining changes, do not delete update yet
          let update = robot.updates[req.body.idx];
            //console.log(update);
            // console.log('update.movies: ')
            // console.log(update[`${changedFieldName}`]);
            // console.log('update.movies: ');
            // console.log(update[`${changedFieldName}`]);
            // console.log('updatedField[movies]:');
            // console.log(updatedField[`${changedFieldName}`]);
            // if (changedFieldName !== 'categories') {
            //   let result = robot[`${changedFieldName}`].filter(movies1 => !update[`${changedFieldName}`].some(movies2 => movies1.link === movies2.link));
            //   console.log('result:');
            //   console.log(result);
            // }
            // if (update[`${changedFieldName}`].includes(updatedField[`${changedFieldName}`])) {
            //     console.log('still remaining updates');
            //     keepThisUpdate = true;
            // }
          
        }
      } 
      console.log(req.body.idx)
      //now we need to remove the update object from our robot
      if (!keepThisUpdate) robot.updates.splice(req.body.idx, 1);
    }

    // otherwise, we're just getting a new robot approved
    else {
      robot.approved = true;
    }

    // time to save the robot and retrieve all robots again
    await robot.save();
    getRobots(req, res);
  } catch (err) {
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

