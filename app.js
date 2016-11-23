let express = require('express');
let app = express();
let portNumber = 3000;

//Currently not handling requests yet
app.get('/', function(request, response){
	response.sendFile(__dirname + '/index.html');
});
app.use('/', express.static(__dirname + '/js'));


app.listen(portNumber, function(){
	console.log("The blog app is listening on port ", portNumber);
});

