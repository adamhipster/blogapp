let express = require('express');
let app = express();
let portNumber = 3000;

//see http://stackoverflow.com/questions/24330014/bodyparser-is-deprecated-express-4
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));



//ROUTES
const postRouter = require(__dirname + '/controllers/post.js');
app.use('/', postRouter);


app.listen(portNumber, function(){
	console.log("The blog app is listening on port ", portNumber);
});

