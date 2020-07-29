const BASE_URL = '/api/robots';

function index() {
  return fetch(BASE_URL)
  .then(response => response.json());
  //.then(res => res.text())          // convert to plain text
  //.then(text => console.log(text))  // then log it out
};

function create(data) {
  return fetch(BASE_URL, {
      method: 'POST',
      headers: {
          'Content-type': 'Application/json'
      },
      body: JSON.stringify(data) //turn the data into JSON (not using AJAX anymore)
      }).then(response => response.json()); 
};

function update(robotId, userId) {
  return fetch(BASE_URL + "/" + robotId, {
    method: 'PUT',
    headers: {
      'Content-type': 'Application/json'
  },
  body: JSON.stringify({userId}) //turn the data into JSON (not using AJAX anymore)
  }).then(response => response.json());
};

export default { index, create, update }