const config = require('./config.js');
let express = require('express');
let app = express();
var session = require('express-session');
let portNumber = 3000;
const sass = require('node-sass');
const fs = require('fs');
let renderExtMiddleware = require('./my_modules/renderExtMiddleware');

sass.render({
	file: __dirname + '/static/styles/main.scss',
	// outputStyle: 'compressed'
}, (err, result) => {
	console.log('result.css = ' + result);
	console.log(err);
	fs.writeFile('static/styles/main.css', result.css, 'utf8', (err, done) => {
		console.log('Done writing css!')
	})
})

//MIDDLEWARE

//if browser is not client, then gives response back in json -- without altering `res.render(args)`.
app.use(renderExtMiddleware);

app.use('/static', express.static(__dirname + '/static'));

//see http://stackoverflow.com/questions/24330014/bodyparser-is-deprecated-express-4
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(session({
    secret: config.session_secret,
    resave: false,
    saveUninitialized: false
  }));

app.use((request, response, next) => {
	const allowedAdminPath = /(^\/admin$|^\/admin\/.*)/;
	if(allowedAdminPath.test(request.path)){
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
const postRouter = require(__dirname + '/routes/post.js');
const adminRouter = require(__dirname + '/routes/admin.js'); //uses same model as postRouter
const authRouter = require(__dirname + '/routes/auth.js');

app.get('/', function (req, res) {
  res.redirect('/archive');
});

app.use('/admin', adminRouter);
app.use('/auth', authRouter);
app.use('/', postRouter);

//VIEWS
app.set('views', __dirname + '/views')
app.set('view engine', 'pug')

app.listen(portNumber, function(){
	console.log("The blog app is listening on port ", portNumber);
});

