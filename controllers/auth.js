//The model is expected to return promises

const express = require('express');
const router = express.Router();
const model = require(__dirname + '/../models/auth.js');
const bcrypt = require('bcrypt');

router.route('/login')
	.get( (request, response) => {
		response.render('login');
	})
	.post( (request, response) => {
		const auth = request.body;
		request.session.username = auth.username;
		request.session.password = auth.password;
		let session = request.session;
		console.log(session.username);
		model.getUsername(session.username)
		.then( (modelUsername) => {
			if(session.username === modelUsername){
				return Promise.resolve(model.getPassword(session.username) ); 
			}
			else{
				return Promise.reject('username was not found.');
			}
		})
		.then( (modelPassword) => {
			console.log('modelPassword: ' + modelPassword);
			bcrypt.compare(session.password, modelPassword, (err, samePasswords) => {
				console.log('err ', err);
				console.log('samePasswords: ' + samePasswords);
				if(samePasswords){
					response.redirect('/admin');
				}
				else{
					response.redirect('login?auth=false');
				}
			});
		})
		.catch(error => {
			console.log(error);
			response.redirect('login?auth=false');
		});
	});

router.route('/logout')
	.get( (request, response) => {
		request.session.regenerate(function onComplete(error) {
			response.end("Sucessfully logged out.\n");
		});
	});




module.exports = router;