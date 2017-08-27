const path = require('path'),
	DB = require(path.join(process.cwd(), 'data')),
	TABLE = 'MOVIE',
	VALIDATION = require(path.join(process.cwd(), 'validation')),
	MOVIE_MODEl = Object.create(null, {
		add: {
			value: (params) => {
				// Not for real DBs
				params.movie.forEach((movie) => {
					return new Promise((resolve, reject) => {
						if (!VALIDATION.isValidString(movie.Title)) {
							reject('Please provide film Title!');
							return;
						}
						if (!VALIDATION.isValidString(movie.Year)) {
							reject('Please provide film Year!');
							return;
						}
						if (!VALIDATION.isValidString(movie.imdbRating)) {
							reject('Please provide film imdbRating!');
							return;
						}
						if (!VALIDATION.isValidString(movie.Genre)) {
							reject('Please provide film Genre!');
							return;
						}
						if (!VALIDATION.isValidString(movie.imdbID)) {
							reject('Please provide film imdbID!');
							return;
						}

						movie.created = new Date();
						DB.insert(TABLE, movie, (err, movieId) => {
							if (err !== null) {
								reject('Movie addition failed');
							}
							DB.insert('USER_MOVIE', { userId: params.userId, 'movieId': movieId }, (err, id) => {
								if (err !== null) {
									reject('Movie addition failed');
								}
								resolve(id);
							})
						});
					});
				});
			}
		},
		get: {
			value: (params) => {
				return new Promise((resolve, reject) => {
					if (!VALIDATION.isValidString(params.userId)) {
						reject('Please provide valid user Id!');
						return;
					}
					DB.fetch('USER_MOVIE', null, (err, userMovieRelations) => {
						if (err !== null) {
							return reject('Fetching session key failed!');
						}
						let movies =[];
						let ids = Object.keys(userMovieRelations);
						for(let id of ids){
							if(userMovieRelations[id].userId === params.userId){
								DB.fetch('MOVIE', userMovieRelations[id].movieId, (err, movie) => {
									movies.push(movie);
								});
							};
						}
						return resolve(movies);
					});
				});
			}
		}
	});

module.exports = MOVIE_MODEl;