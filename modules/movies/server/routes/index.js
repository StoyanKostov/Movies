const CONTROLLER = require('../controller');

module.exports = {
	"/": {
		method: 'GET',
		handler: function (req, res) {
			CONTROLLER.home().then((content) => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'text/html');
				res.end(content);
			}).catch((err) => {
				res.statusCode =  404;
				res.end(JSON.stringify({
					code: 1,
					message: err.message || 'Not found'
				}));
			});
		}
	}
};