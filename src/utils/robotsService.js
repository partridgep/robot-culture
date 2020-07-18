const BASE_URL = '/api/robots/';

export default {
  index,
  create
};

function index() {
  return fetch(BASE_URL).then(res => res.json());
}

function create(robot) {
  const options = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(robot)
  };
  return fetch(BASE_URL, options).then(res => res.json());
}