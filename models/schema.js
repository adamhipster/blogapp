//mongodb

db.users.insertOne(
	{firstname: "Melvin", lastname: "Roest", username: "mella", password: "paard"}
)

db.posts.insertOne(
	{date: new Date(), username: "mella", firstname: "Melvin", lastname: "Roest", title: "Lifehack", body: "The best lifehack is hugging people. It only takes a couple of seconds and it releases a lot of oxytocin :)"}
)

db.posts.insertOne(
	{date: new Date(), username: "mella", firstname: "Melvin", lastname: "Roest", title: "Iceman", body: "The Wim Hof Method is a way to naturally give yourself adrenaline. Scientist from the Radboud University have proven this."}
)

//query methods that might be useful

//find
db.users.find({ firstname: "Joe" }) //find all
db.users.findOne({ firstname: "Joe" }) //finds one

//delete
db.users.deleteOne( { firstname: "Joe" } )

//delete everything
db test
db.dropDatabase()

//forEach method
db.posts.find({},{}).sort( { _id: 1 } ).forEach( function(myDoc) { print(myDoc.body) } )