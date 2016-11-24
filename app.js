let config = require('./config.js');
let express = require('express');
let app = express();
var session = require('express-session');
let portNumber = 3000;

app.set('views', __dirname + '/views')
app.set('view engine', 'pug')

//MIDDLEWARE

//see http://stackoverflow.com/questions/24330014/bodyparser-is-deprecated-express-4
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  }));

app.use((request, response, next) => {
	console.log('username ' + request.session.username);
	if(request.path === '/admin'){
		console.log('request.path ' + request.path);
		if (request.session.username !== undefined){
			console.log('access to admin\n');
			next();
		} else {
			console.log('no access to admin\n');
			response.redirect('/auth/login');
		}
	}
	else{
		next();
	}
});

//ROUTES
const postRouter = require(__dirname + '/controllers/post.js');
const authRouter = require(__dirname + '/controllers/auth.js');

app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!' })
});

app.use('/', postRouter);
app.use('/auth', authRouter);


app.listen(portNumber, function(){
	console.log("The blog app is listening on port ", portNumber);
});

