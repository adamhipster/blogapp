const monk = require('monk')
const url = 'localhost:27017/blogapp';
const db = monk(url);
const users = db.get('users');

exports.getUser = (username) => {
	return users.findOne({username: username})
	.then( (result) => {
		return Promise.resolve(result);
	}).catch(console.log.bind(console));
}

exports.getUsername = (username) => {
	return users.findOne({username: username}, 'username')
	.then( (result) => {
		console.log('result: ' + result.username);
		return Promise.resolve(result.username);
	});
}

exports.getPassword = (username) => {
	return users.findOne({username: username}, 'password')
	.then( (result) => {
		return Promise.resolve(result.password);
	});
}
