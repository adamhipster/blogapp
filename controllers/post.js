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
		let posts = model.getAllPosts();
		posts.then( (posts) => {
			console.log('session...\n');
			console.log(request.session);
			if(request.session.isEdited){
				const body = request.session.postBody;
				const title = request.session.postTitle;
				request.session.postBody = '';
				request.session.postTitle = '';
				request.session.isEdited = false;
			response.render('admin', 
				{
				action: '/admin/' + title + '/edit',
				title: title,
				body: body,
				posts: posts, 
				username: request.session.username, 
				password: request.session.password
				});
				console.log('get1 ' + request.session.isEdited);
			}
			else{
			response.render('admin', 
				{
				action: '/admin/createPost',
				posts: posts, 
				username: request.session.username, 
				password: request.session.password
				});
				console.log('get2 ' + request.session.isEdited);
			}
		});
	});

// router.route('/admin')
// 	.get( (request, response) => {
// 		let posts = model.getAllPosts();
// 		posts.then( (posts) => {
// 			console.log(posts);
// 		});
// 	});

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
			createdPost.then( () => response.redirect('/admin'));
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


//deletes *all* posts with the same title, since the key should be unique (not implemented yet)
router.route('/admin/:postTitle/delete')
	.get( (request, response) => {
		const title = decodeURI(request.params.postTitle);
		console.log('title ' + title);
		let postTitle = model.deletePostByTitle(title);
		postTitle.then( (result) => {
			console.log('post deleted\n');
			console.log(result);
			response.redirect('/admin');
		});
	});

router.route('/admin/:postTitle/edit')
	.get( (request, response) => {
		console.log('request.params.title\n');
		console.log(request.params.title);
		let postTitle = model.getPostByTitle(request.query.title);
		//Waarom wordt result als een array teruggegeven?
		//Geeft de onderliggende implementatie het zo terug? This has to change...
		postTitle.then( (result) => {
			console.log('postTitle');
			console.log(result);
			console.log(result[0].body);
			console.log(result[0].title);
			request.session.postBody = result[0].body;
			request.session.postTitle = result[0].title;
			request.session.isEdited = true;
			response.redirect('/admin');
		})
		.catch( (error) => {
			console.log(error);
		});
	})
	.post( (request, response) => {
		const post = request.body;
		const keys = Object.keys(post);
		const vals = keys.map(key => post[key]);
		const hasAllProperties = checkProperties(post, 'title', 'body');
		if(hasAllProperties){
			let editedPost = model.editPostByTitle(request.params.postTitle, post.title, post.body);
			editedPost.then( (result) => {
				console.log('post edited\n');
				console.log(result);
				response.redirect('/admin');
			});
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