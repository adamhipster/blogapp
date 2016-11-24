const monk = require('monk')
const url = 'localhost:27017/blogapp';
const db = monk(url);
const users = db.get('users');

//for development: this account exists
//db.users.insertOne( {username: "mella", password: "paard"} )

exports.getUsername = (username) => {
	return users.findOne({username: username}, 'username')
	.then( (result) => {
		console.log('result: ' + result.username);
		return result.username;
	});
}

exports.getPassword = (username) => {
	return users.findOne({username: username}, 'password')
	.then( (result) => {
		return result.password;
	});
}