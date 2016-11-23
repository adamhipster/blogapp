const monk = require('monk')

// Connection URL
const url = 'localhost:27017/myproject';

const db = monk(url);

db.then(() => {
  console.log('Connected correctly to server')
})