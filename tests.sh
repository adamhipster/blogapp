#!/usr/bin/env bash

print("Note schema.js needs to be initialized...")

#Ping to see if post request works with curl
curl --data "param1=value1&param2=value2" http://httpbin.org/post

#Archives
curl localhost:3000/archive

#Get post id (true)
curl localhost:3000/posts/1

#Get post id (false)
curl localhost:3000/posts/10010

#Get post by title (true)
curl localhost:3000/WHM

#Get post by title (false)
curl localhost:3000/The%20Wim%20Hof%20Metho

#Authentication (false)
curl --location --cookie cookies.txt --cookie-jar cookies.txt --data "username=mell&password=paard" localhost:3000/auth/login

#Authentication (false)
curl --location --cookie cookies.txt --cookie-jar cookies.txt --data "username=mella&password=paar" localhost:3000/auth/login

#Authentication (true)
curl --location --cookie cookies.txt --cookie-jar cookies.txt --data "username=mella&password=paard" localhost:3000/auth/login

#Creating a post
curl --location --cookie cookies.txt --cookie-jar cookies.txt --data "title=YMCA&body=When I was young it was one of the first songs I heard on vacation near Venezuela." http://localhost:3000/admin/createPost

#Creating a second post
curl --location --cookie cookies.txt --cookie-jar cookies.txt --data "title=Google&body=I learned most things through Google and YouTube" http://localhost:3000/admin/createPost

#Creating a faulty post (firstname is not a full key)
curl --location --cookie cookies.txt --cookie-jar cookies.txt --data "body=I learned most things through Google and YouTube" http://localhost:3000/admin/createPost

#Remove post by title (true)
curl -L --cookie cookies.txt --cookie-jar cookies.txt localhost:3000/admin/WHM/delete
curl localhost:3000/WHM #See for yourself

#Edit post by title (changed)
echo; echo "Logging in..."; echo
curl --location --cookie cookies.txt --cookie-jar cookies.txt --data "username=mella&password=paard" localhost:3000/auth/login
echo; echo "Creating post..."; echo
curl -L --cookie cookies.txt --cookie-jar cookies.txt --data "username=mella&firstname=Melvin&lastname=Roest&title=WHM&body=There is an article written about it in PNAS" http://localhost:3000/admin/createPost
echo; echo "Displaying post..."; echo
curl localhost:3000/WHM #See? It's there!
echo; echo "Editing post..."; echo
curl -L --cookie cookies.txt --cookie-jar cookies.txt --data "title=the immune response on the wim hof method&body=It's scientific..." http://localhost:3000/admin/WHM/edit
echo; echo "Displaying old title of edited post (false)"; echo
curl localhost:3000/WHM #Poof! Gone!
echo; echo "Displaying the edited post (true)"; echo
curl localhost:3000/The%20Wim%20Hof%20Method #Tada!
echo; echo "Done"; echo