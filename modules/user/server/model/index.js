const path = require('path'),
	{ genSessionKey, genPassword, isPasswordValid } = require(path.join(process.cwd(), 'utils')),
	DB = require(path.join(process.cwd(), 'data')),
	TABLE = 'USER',
	VALIDATION = require(path.join(process.cwd(), 'validation')),
	USER_MODEL = Object.create(null, {
		register: {
			value: (user) => {
				return new Promise((resolve, reject) => {
					if (!VALIDATION.isValidString(user.username)) {
						return reject('Please enter username!');
					}
					if (!VALIDATION.isValidString(user.password)) {
						return reject('Please enter password!');
					}
					if (!VALIDATION.isValidString(user.confirmPasword)) {
						return reject('Please enter password!');
					}
					if (user.password !== user.confirmPasword) {
						return reject('Please please confirm password!');
					}
					if (!VALIDATION.isValidString(user.firstName)) {
						return reject('Please enter forename!');
					}
					if (!VALIDATION.isValidString(user.lastName)) {
						return reject('Please enter surname!');
					}
					if (!VALIDATION.isValidEmail(user.email)) {
						return reject('Please enter email!');
					}

					DB.getByUsername(TABLE, user.username, (err, userData) => {
						if (userData !== null) {
							return reject(new Error('Username is not available'));
						}
						genPassword(user.password).then((passwordObj) => {
							newUser = {
								username: user.username,
								firstName: user.firstName,
								lastName: user.lastName,
								email: user.email,
								passwordHash: passwordObj.passwordHash,
								salt: passwordObj.salt,
								created: new Date()
							}
							DB.insert(TABLE, newUser, (err, id) => {
								if (err !== null) {
									return reject(new Error('User creation failed'));
								}

								return resolve(id);
							})
						});
					});
				});
			}
		},
		login: {
			value: (user) => {
				let userData;
				return new Promise((resolve, reject) => {
					if (!VALIDATION.isValidString(user.username)) {
						return reject('Please enter forename!');
					}
					if (!VALIDATION.isValidString(user.password)) {
						return reject('Please enter forename!');
					}
					getByUsername(user.username).then((data) => {
						userData = data;
						return isPasswordValid(user.password, userData.salt, userData.passwordHash);
					}).then((isAuthenticated) => {
						if (!isAuthenticated) {
							return reject('User login failed');
						}
						return genSessionKey();
					}).then((newSessionKey) => {
						let data = { id: userData.id, username: user.username, loggedIn: new Date(), sessionKey: newSessionKey };
						DB.insert('ACTIVE_SESSION', data, (err, result) => {
							if (err !== null) {
								return reject('User login failed');
							}
							data.firstName = userData.firstName;
							data.lastName = userData.lastName;
							return resolve(data);
						});
					}).catch((err) => {
						return reject(err);
					});
				});
			}
		},
		getBySessionKey: {
			value: (sessionKey) => {
				let userData;
				return new Promise((resolve, reject) => {
					if (!VALIDATION.isValidString(sessionKey)) {
						return reject('Please provide valid sessionKey!');
					}
					DB.fetch('ACTIVE_SESSION', null, (err, activeSessions) => {
						if (err !== null) {
							return reject('Fetching session key failed!');
						}

						let ids = Object.keys(activeSessions);
						for(let id of ids){
							if(activeSessions[id].sessionKey === sessionKey){
								return resolve(activeSessions[id]);
							};
						}

						return reject('Invalid session key!');
					});
				});
			}
		}
	});

function getByUsername(username) {
	return new Promise((resolve, reject) => {
		if (!VALIDATION.isValidString(username)) {
			return reject('Please provide username!');
		}

		DB.getByUsername(TABLE, username, (err, user) => {
			if (err !== null) {
				return reject(err);
			}

			return resolve(user);
		});
	});
}

module.exports = USER_MODEL;