const path = require('path'),
	CONTROLLER = require(path.join('..', 'controller')),
	{ getSession } = require(path.join(process.cwd(), 'modules', 'utils'));

module.exports = {
	"/add": {
		method: 'POST',
		handler: function (req, res) {
			getSession(req.headers.cookie).then( ( session )=> {
				return CONTROLLER.add({ 'userId': session.id, 'movie': req.body});
			} ).then((id) => {
				res.statusCode = 201;
				res.end(JSON.stringify({
					code: 0,
					message: 'Movie addition success',
					payload: { id: id }
				}));
			}).catch((err) => {
				res.statusCode = 409;
				res.end(JSON.stringify({
					code: 1,
					message: err.message || 'Movie addition failed'
				}));
			});
		}
	},
	"/get": {
		method: 'GET',
		handler: function (req, res) {
			getSession(req.headers.cookie).then( ( session )=> {
				return CONTROLLER.get({ 'userId': session.id });
			} ).then((movies) => {
				res.statusCode = 200;
				res.end(JSON.stringify({
					code: 0,
					message: 'Movies fetch success',
					payload: movies
				}));
			}).catch((err) => {
				res.statusCode = 404;
				res.end(JSON.stringify({
					code: 1,
					message: err.message || 'Movie fetch failed'
				}));
			});
		}
	}
};