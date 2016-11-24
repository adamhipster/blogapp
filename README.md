#Blog app in node.js

##My requirements list (not finished)
See requirements.txt ;)

##How to make it work on your own machine

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
