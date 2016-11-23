#!/usr/bin/env bash

#Ping to see if post request works with curl
curl --data "param1=value1&param2=value2" http://httpbin.org/post

#Creating a post
curl --data "username=mella&firstname=Melvin&lastname=Roest&title=YMCA&body=When I was young it was one of the first songs I heard on vacation near Venezuela." http://localhost:3000/createPost

#Creating a second post
curl --data "username=mella&firstname=Melvin&lastname=Roest&title=Google&body=I learned most things through Google and YouTube" http://localhost:3000/createPost

#Creating a faulty post (firstname is not a full key)
curl --data "username=mella&firstme=Melvin&lastname=Roest&title=Google&body=I learned most things through Google and YouTube" http://localhost:3000/createPost

#Archives
curl localhost:3000/archive

#Get post id (true)
curl localhost:3000/posts/1

#Get post id (false)
curl localhost:3000/posts/10010

#Get post by title (true)
curl localhost:3000/YMCA

#Get post by title (false)
curl localhost:3000/The%20Wim%20Hof%20Metho

#Remove post by title (true)
curl localhost:3000/Google/delete
curl localhost:3000/Google #False if database is empty upon initialization
curl localhost:3000/archive #See for yourself

#Edit post by title (changed)
curl --data "username=mella&firstname=Melvin&lastname=Roest&title=WHM&body=There is an article written about it in PNAS" http://localhost:3000/createPost
curl localhost:3000/WHM #See? It's there!
curl --data "title=the immune response on the wim hof method&body=It's scientific..." http://localhost:3000/WHM/edit
curl localhost:3000/WHM #Poof! Gone!
curl localhost:3000/The%20Wim%20Hof%20Method #Tada!

