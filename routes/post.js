//The model is expected to return promises

const express = require('express');
const router = express.Router();
const model = require(__dirname + '/../models/post.js');

router.route('/archive')
	.get( (request, response) => {
		let posts = model.getAllPosts();
		posts.then( (allPosts) => {
			console.log(request.session.username);
			response.render('archive',
			{
				username: request.session.username,
				posts: allPosts,	
			});
		});
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
		postTitle.then( (post) => {
			console.log('routing /:postTitle...\n');
			console.log(post);
			response.render('detail',
			{
				username: request.session.username,
				post: post[0],
			});
		});
	});



module.exports = router