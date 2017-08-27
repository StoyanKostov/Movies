const CONTROLLER = require('../controller');

module.exports = {
	"/create": {
		method: 'POST',
		handler: function (req, res) {
			CONTROLLER.create(req.body).then((id) => {
				res.statusCode = 201;
				res.end(JSON.stringify({
					code: 0,
					message: 'User creation success',
					payload: { id: id }
				}));
			}).catch((err) => {
				res.statusCode =  409;
				res.end(JSON.stringify({
					code: 1,
					message: err.message || 'User creation failed'
				}));
			});
		}
	},
	"/login": {
		method: 'POST',
		handler: function (req, res) {
			CONTROLLER.login(req.body).then((user) => {
				res.statusCode = 200;
				res.setHeader('Set-Cookie', `sessionKey=${user.sessionKey};Domain=127.0.0.1;Path=/`);
				res.end(JSON.stringify({
					code: 0,
					message: 'User login success',
					payload: {
						"username": user.username,
						"firstName": user.firstName,
						"lastName": user.lastName
					}
				}));
			}).catch((err) => {
				res.statusCode =  404;
				res.end(JSON.stringify({
					code: 1,
					message: err.message || 'User login failed'
				}));
			});
		}
	}/*,
	"/read": {
		method: 'GET',
		handler: function (req, res) {
			CONTROLLER.read(req.body).then((user) => {
				res.statusCode = 200;
				res.end(JSON.stringify({
					code: 0,
					message: 'User read success',
					payload: user
				}));
			}).catch((err) => {
				res.statusCode =  404;
				res.end(JSON.stringify({
					code: 1,
					message: err.message || 'User read failed'
				}));
			});
		}
	},
	"/update": {
		method: 'PUT',
		handler: function (req, res) {
			CONTROLLER.update(req.body).then((id) => {
				res.statusCode = 200;
				res.end(JSON.stringify({
					code: 0,
					message: 'User update success',
					payload: { id: id }
				}));
			}).catch((err) => {
				res.statusCode =  404;
				res.end(JSON.stringify({
					code: 1,
					message: err.message || 'User update failed'
				}));
			});
		}
	},
	"/delete": {
		method: 'DELETE',
		handler: function (req, res) {
			CONTROLLER.delete(req.body).then((id) => {
				res.statusCode = 200;
				res.end(JSON.stringify({
					code: 0,
					message: 'User deletion success',
					payload: { id: id }
				}));
			}).catch((err) => {
				res.statusCode =  404;
				res.end(JSON.stringify({
					code: 1,
					message: err.message || 'User deletion failed'
				}));
			});
		}
	}*/
};