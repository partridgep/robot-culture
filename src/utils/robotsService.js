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

// favorite a robot
function favorite(robotId, userId) {
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

function update(robotId, updatedFields) {
  return fetch(BASE_URL + "/" + robotId, {
    method: 'PUT',
    headers: {
      'Content-type': 'Application/json'
  },
  body: JSON.stringify({updatedFields}) //turn the data into JSON 
  }).then(response => response.json());
}

function approveChange(robotId, updatedField, idx) {
  return fetch(BASE_URL + "/" + robotId, {
    method: 'PUT',
    headers: {
      'Content-type': 'Application/json'
  },
  body: JSON.stringify({updatedField, idx}) //turn the data into JSON 
  }).then(response => response.json());
}

function denyChange(robotId, updatedField, idx) {
  return fetch(BASE_URL + "/" + robotId, {
    method: 'PUT',
    headers: {
      'Content-type': 'Application/json'
  },
  body: JSON.stringify({updatedField, idx, denied: true}) //turn the data into JSON 
  }).then(response => response.json());
}

function approveRemoval(robotId, updatedField, idx) {
  return fetch(BASE_URL + "/" + robotId, {
    method: 'PUT',
    headers: {
      'Content-type': 'Application/json'
  },
  body: JSON.stringify({updatedField, idx, toBeRemoved: true}) //turn the data into JSON 
  }).then(response => response.json());
}

// delete robot 
function deleteRobot(robotId) {
  console.log(robotId);
  return fetch(BASE_URL + "/" + robotId, {
    method: 'DELETE'
  }).then(response => response.json());
}

export default { index, create, favorite, approve, deleteRobot, update, approveChange, denyChange, approveRemoval }