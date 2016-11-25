let config = require('./config.js');
let express = require('express');
let app = express();
var session = require('express-session');
let portNumber = 3000;
const sass = require('node-sass');
const fs = require('fs');

sass.render({
	file: __dirname + '/static/styles/main.scss',
	outputStyle: 'compressed'
}, (err, result) => {
	// console.log('result.css = ' + result.css)
	fs.writeFile('static/styles/main.css', result.css, 'utf8', (err, done) => {
		console.log('Done writing css!')
	})
})

//MIDDLEWARE
app.use('/static', express.static(__dirname + '/static'));

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
	console.log(request.path);
	const allowedAdminPath = /(^\/admin$|^\/admin\/.*)/;
	if(allowedAdminPath.test(request.path)){
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
const adminRouter = require(__dirname + '/controllers/admin.js'); //uses same model as postRouter
const authRouter = require(__dirname + '/controllers/auth.js');

app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!' })
});

app.use('/', postRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);

//VIEWS
app.set('views', __dirname + '/views')
app.set('view engine', 'pug')

app.listen(portNumber, function(){
	console.log("The blog app is listening on port ", portNumber);
});

