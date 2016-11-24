//The model is expected to return promises

const express = require('express');
const router = express.Router();
const model = require(__dirname + '/../models/post.js');

router.route('/archive')
	.get( (request, response) => {
		let posts = model.getAllPosts();
		posts.then( (result) => {
			response.send(result);
		});
	});

/*
ANATOMY OF A POST (_id is automatically generated)
{
	"_id" : ObjectId("58360fcad952a319b69c018f"),
	"date" : ISODate("2016-11-23T21:53:14.318Z"),
	"username" : "mella",
	"author" : "Melvin Roest",
	"title" : "the immune response on the wim hof method",
	"body" : "There is an article written about it in PNAS"
}
*/

router.route('/admin')
	.get( (request, response) => {
		response.render('admin', {username: request.session.username, password: request.session.password})
	});

router.route('/admin/createPost')
	.post( (request, response) => {
		const post = request.body;
		const keys = Object.keys(post);
		const vals = keys.map(key => post[key]);

		const hasAllProperties = checkProperties(post, 'title', 'body');

		if(hasAllProperties){
			//also adds first and last name (in the model)
			let createdPost = model.createPost(
				request.session.username,  
				post.title, 
				post.body);
			createdPost.then( x => response.redirect('/admin'));
		}
		else{
			reportError(response, keys);
		}
	});

//This doesn't work well with nosql databases, don't use this :P
//I don't feel like implementing a proper method due to SEO ;)
router.route('/posts/:postId')
	.get( (request, response) => {
		let postId = model.getPostById(request.params.postId);
		postId.then( (result) => {
			response.send(result);
		});
	});

router.route('/:postTitle')
	.get( (request, response) => {
		let postTitle = model.getPostByTitle(request.params.postTitle);
		postTitle.then( (result) => {
			response.send(result);
		});
	});



router.route('/admin/:postTitle/delete')
	.get( (request, response) => {
		let postTitle = model.deletePostByTitle(request.params.postTitle);
		postTitle.then( (result) => {
			response.send(result);
		});
	});

router.route('/admin/:postTitle/edit')
	.post( (request, response) => {
		const post = request.body;
		const keys = Object.keys(post);
		const vals = keys.map(key => post[key]);
		console.log(keys);
		const hasAllProperties = checkProperties(post, 'title', 'body');
		if(hasAllProperties){
			let editedPost = model.editPostByTitle(request.params.postTitle, post.title, post.body);
			editedPost.then( (result) => {
				response.send(result);
			});
			// .then( x => response.redirect('/'));
		}
		else{
			reportError(response, keys);
		}
	});

function checkProperties(myObject, ...propertiesToCheck){
	for(let i = 0; i < propertiesToCheck.length; i++){
		if(!myObject.hasOwnProperty(propertiesToCheck[i])){
			return false;
		}
	}
	return true;
}

function reportError(response, keys){
	let error = "";
	for (let i = 0; i < keys.length; i++){
		error += ' ' + keys[i];
	}
	response.end("Not all parameters were given. The following keys did exist: \n" + keys + "\n");
}

module.exports = router