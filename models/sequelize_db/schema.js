const Sequelize = require('sequelize')
const db = new Sequelize('blogapp', 'melvin', '', {
	dialect: 'postgres',
});

db.authenticate().catch(x => console.log(x)).then(x => console.log('>> database connection established'));

const User = db.define('user', {
	firstname: {
		type: Sequelize.STRING,
		unique: false,
		allowNull: false,
	},
	lastname: {
		type: Sequelize.STRING,
		unique: false,
		allowNull: false,
	},
	username: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: false,
	},
	password:{
		type: Sequelize.STRING,
		unique: false,
		allowNull: false,
	},
},
{
	paranoid: true
});

const Post = db.define('post', {
	title: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: false,
	},
	body: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: false,
	},
},
{
	paranoid: true
});

User.hasMany(Post)
Post.belongsTo(User)


db.sync({force:true})
.then( (x) => {
	return Promise.all([
			User.create({
				firstname:'Melvin',
				lastname:'Roest',
				username:'mella',
				password: '$2a$10$Ggg0Usp6T2a.lJMbTWrLEupiZUJBjH4uQy.G1tpzxu9gX9EtnJyUm',
				posts: [
					{title:'Lifehack', body: 'The best lifehack is hugging people.' },
					{title:'Awesome', body: 'Just Splendid!'},
				]
			}, {
				include: [ Post ]
			}),
		])
	})
.catch( (error) => console.log(error) );


module.exports = {db: db, User: User, Post: Post, 



getAllPosts: () => {
	return Post.findAll({
		include: [User],
	})
	.then( (posts) => {
		posts = deletePassword(posts);
		return posts;
	});
},


getPostById: (id) => {
	return Post.findById(id, {
		include: [User],
	})
	.then( (post) => {
		post = deletePassword(post);
		return post;
	});
},

getPostByTitle: (title) => {
	return Post.findAll({
		include: [User],
		where: {
			title: title,
		}
	})
	.then( (post) => {
		post = deletePassword(post);
		return post;
	});
},

getUser: (username) => {
	return User.findOne({
		where: {
			username: username,
		}
	})
	.then( (user) => {
		return user;
	});
},

createPost: (username, title, body) => {
	return User.findOne({ 
		where: {
			username: username
		} 
	})
	.then( (user) => {
		return Post.create({
			title: title,
			body: body,
			userId: user.id,
		})
	})
	.catch( (error) =>{
		console.log(error);
		return error;
	})


},


deletePostByTitle: (title) => {
	return Post.destroy({
	  where: {
	    title: title
	  }
	});
},

editPostByTitle: (originalTitle, title, body) => {
	return Post.findOne({ 
		where: {
			title: originalTitle
		}
	})
	.then( (post) =>{
		return post.update({
			title: title,
			body: body,
		})
	})
},

};

						


//PRIVATE
function deletePassword(posts){
	if(posts.length){
		for(let i = 0; i < posts.length; i++){
			delete posts[i].dataValues.user.dataValues.password;
		}
	}
	else{
		delete posts.dataValues.user.dataValues.password;
	}
	return posts;
}



