let isBrowser = require('user-agent-is-browser');

module.exports = function(req, res, next) {
	res.renderOld = res.render;
	res.render = renderExtension;
	next();
}

function renderExtension (view, locals, callback) {	
	const userAgent = this.req.headers['user-agent'];
	if(isBrowser(userAgent)){
		this.renderOld(view, locals, callback);	
	}
	else{
		this.json(locals);
	}
}