//The model is expected to return promises

const express = require('express');
const router = express.Router();
const model = require(__dirname + '/../models/sequelize_db/schema.js'); //todo: change later to post.js
// const model = require(__dirname + '/../models/mongo_db/post.js');
let isBrowser = require('user-agent-is-browser');

const markdownParser = require(__dirname + '/../models/showdown_server.js');

router.route('/archive')
	.get( (request, response) => {
		let posts = model.getAllPosts();
		posts.then( (allPosts) => {

			console.log('hey');
			
			if(!isBrowser(request.headers['user-agent'])){
				response.json({username: request.session.username, posts: allPosts}); return;
			}
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
			response.json(result);
		});
	});

router.route('/:postTitle')
	.get( (request, response) => {
		let postTitle = model.getPostByTitle(request.params.postTitle);
		postTitle.then( (post) => {
			if(!isBrowser(request.headers['user-agent'])){
				response.json({username: request.session.username, post: post[0]}); return;
			}
			response.render('detail',
			{
				username: request.session.username,
				post: {title: post[0].title, body: markdownParser.makeHtml(post[0].body)},
			});
		})
		.catch( (error) => {console.log(error);});
	});



module.exports = router