const BASE_URL = '/api/robots';

// get all robots in database
function index() {
  return fetch(BASE_URL)
  .then(response => response.json());
};

// add new robot to database
function create(data) {
  return fetch(BASE_URL, {
      method: 'POST',
      headers: {
          'Content-type': 'Application/json'
      },
      body: JSON.stringify(data) //turn the data into JSON 
      }).then(response => response.json()); 
};

// update a robot (let it be favorited)
function update(robotId, userId) {
  return fetch(BASE_URL + "/" + robotId, {
    method: 'PUT',
    headers: {
      'Content-type': 'Application/json'
  },
  body: JSON.stringify({userId}) //turn the data into JSON 
  }).then(response => response.json());
};

// update robot -> get approved
function approve(robotId) {
  return fetch(BASE_URL + "/" + robotId, {
    method: 'PUT',
    headers: {
      'Content-type': 'Application/json'
  }
  }).then(response => response.json());
}

// delete robot 
function deleteRobot(robotId) {
  return fetch(BASE_URL + "/" + robotId, {
    method: 'DELETE',
    headers: {
      'Content-type': 'Application/json'
  }
  }).then(response => response.json());
}

export default { index, create, update, approve, deleteRobot }