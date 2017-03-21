const bcrypt = require('bcrypt');

//for development: this account exists
//db.users.insertOne( {username: "mella", password: "paard"} )

exports.authenticate = (password, user) => {
	return new Promise(function(resolve, reject) {
		bcrypt.compare(password, user.password, (error, samePasswords) => {
			if(error) reject(new Error("bcrypt.compare(args) failed:" + error));
			resolve(samePasswords);
		})
	})
	.catch( error => console.log(error))
}

