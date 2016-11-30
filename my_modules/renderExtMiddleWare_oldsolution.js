let isBrowser = require('user-agent-is-browser');

module.exports = function(req, res, next) {
	//without `res.renderOld` there is no way I know to expose `this` to the `render` function of express.
	res.renderOld = res.render;
	res.render = renderExtension;
	next();
}

function renderExtension (view, locals, callback) {	
	const userAgent = this.req.headers['user-agent'];
	
	//render like we always do.
	if isBrowser(userAgent)
		this.renderOld(view, locals, callback);	
	
	//render however you want, the client is not a browser
	else 
		this.json(locals);
}
