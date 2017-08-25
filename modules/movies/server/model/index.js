const path = require('path'),
	DB = require(path.join(process.cwd(), 'data')),
	VALIDATION = require(path.join(process.cwd(), 'validation')),
	MOVIE_MODEl = Object.create(null, {
		add: {
			value: (params) => {
				let film = params[0];
				return new Promise( (resolve, reject) => {
					if (!VALIDATION.isValidString(film.Title)) {
						reject('Please enter forename!');
						return;
					}
					if (!VALIDATION.isValidString(film.Year)) {
						reject('Please enter surname!');
						return;
					}
					if (!VALIDATION.isValidString(film.imdbRating)) {
						reject('Please enter email!');
						return;
					}
					if (!VALIDATION.isValidString(film.Genre)) {
						reject('Please enter email!');
						return;
					}
					if (!VALIDATION.isValidString(film.imdbID)) {
						reject('Please enter email!');
						return;
					}

					film.created = new Date();
					DB.insert(film, (err, id) => {
						if( err !== null ){
							reject('Movie addition failed');
						}

						resolve(id);
					});
				});
			}
		}/*,
		getById: {
			value: (params) => {
				return new Promise((resolve, reject) => {
					if (!VALIDATION.isDefined(params.id)) {
						reject('Please enter user Id!');
					}

					DB.fetch(params.id, (err, user) => {
						if( err !== null ){
							reject('User read failed');
						}

						resolve(user);
					});
				});
			}
		},
		updateById: {
			value: (params) => {
				return new Promise((resolve, reject) => {
					if (!VALIDATION.isDefined(params.id)) {
						reject('Please enter user Id!');
					}

					DB.update(params, (err, id) => {
						if( err !== null ){
							reject('User update failed');
						}

						resolve(id);
					});
				});
			}
		},
		deleteById: {
			value: (params) => {
				return new Promise((resolve, reject) => {
					if (!VALIDATION.isDefined(params.id)) {
						reject('Please enter user Id!');
					}

					DB.remove(params, (err, id) => {
						if( err !== null ){
							reject('User update failed');
						}

						resolve(id);
					});
				});
			}
		}*/
	});

module.exports = MOVIE_MODEl;