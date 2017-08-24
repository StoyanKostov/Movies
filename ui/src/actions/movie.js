import { requestDispatcher } from '../helpers.js'

export const getMovie = title => {
    return (dispatch, getState) => {
        return fetch(`http://www.omdbapi.com/?t=${title}&apikey=plzBanMe`).then((response) => response.json())
            .then(movie => {
                return dispatch({ type: 'GET_MOVIE_SUCCESS', movie });
            }).catch(error => {
                return error;
            });
    };
};

export const addToFavorites = newMovie => {
    return (dispatch, getState) => {
        let state = getState();
        let hasMovie = state.favorites.some(movie => movie.imdbID === newMovie.imdbID);
        if (!hasMovie) {
            return dispatch({ type: 'ADD_TO_FAVORITES', 'movie': newMovie });
        }
    };
};

export const saveFavorites = newMovie => {
    return (dispatch, getState) => {
        let state = getState();
        requestDispatcher('http://127.0.0.1:8080/movies/add', {
            method: 'POST',
            header: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            data: state.favorites
        }).then(function (response) {
            return response.json()
        }).then(function (body) {
            console.log(body);
        });
    };
};

export const getMovieSuccess = movie => {
    movie.receivedAt = Date.now();
    return {
        type: 'GET_MOVIE_SUCCESS',
        movie
    };
}

export const removeMovie = id => {
    return {
        type: 'REMOVE_MOVIE',
        id
    };
};
