const monk = require('monk')
const url = 'localhost:27017/blogapp';
const db = monk(url);
const posts = db.get('posts');
const users = db.get('users');



exports.getAllPosts = () => {
	return posts.find({})
		.then( allPosts => {
			return allPosts;
		});
}

//might be a better way to implement this, a collection kind of ensures ordering but not really
//see https://automattic.github.io/monk/docs/collection/count.html
exports.getPostById = (id) => {
	return posts.find({})
		.then( (allPosts) => {
			return allPosts[id]; //return only result w/ id
		});
}

exports.getPostByTitle = (title) => {
	return posts.find({title: title})
		.then( (post) => {
			return post;
		});
}

//NOTE: in the original mongodb API this seems to be deprecated, which means monk is deprecated
exports.createPost = (username, title, body) => {
	return users.findOne({username: username}, { fields: { firstname: 1, lastname: 1} })
	.then( (oneUser) => {
		return oneUser;
	})
	.then( (result) => {
		console.log(result.firstname + ' ' + result.lastname);
		posts.insert({
			date: new Date(),
			username: username,
			firstname: result.firstname,
			lastname: result.lastname,
			title: title,
			body: body
		});
	})
	.catch( (error) => {
		console.log(error);
	});
}

exports.deletePostByTitle = (title) => {
	return posts.remove({title: title});
}

exports.editPostByTitle = (originalTitle, title, body) => {
	return posts.update({title: originalTitle}, {title, body})
}