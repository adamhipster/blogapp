##Blog app in node.js

#My requirements list (not finished)
``GENERAL REQUIREMENTS
1. Do it in mongodb and in sequelize (shows that you decoupled the models).
2. Do it with 2 different views (shows that you decoupled the views). One in Bootstrap and the other in Material Design.

1. A blog backend with the ability to:
	a) Authenticate the user via sessions with a hashed password 
		* Note: user creation is via database only with a hashed password
	b) Create a post
	c) See a list of posts
		* With the ability to delete if admin
		* With the ability to edit if admin

2. A blog frontend with the ability to:
	a) See a post (detailed page)
	b) See a list of posts (archive)``

#How to make it work on your own machine

You need to have homebrew installed or something similar.

To run it:
``node app.js``

To install dependencies:
``npm install``

It also requires spinning up a mongodb server. For that you'd need to do:
``brew install mongodb``
``mongod --dbpath /tmp #starts mongodb server``

Start up the mongodb client to add an initial user with the username `mella` and (hashed) password `paard`
``mongo``
In the mongo db client you type:
``use blogapp``
``db.users.insertOne(
        {firstname: "Melvin", lastname: "Roest", username: "mella", password: "$2a$10$Ggg0Usp6T2a.lJMbTWrLEupiZUJBjH4uQy.G1tpzxu9gX9EtnJyUm"}
)``

The fun starts at:
``localhost:3000/auth/login``

To logout type: `localhost:3000/auth/logout`

Still a work in progress :)
