import { requestDispatcher } from '../utils.js'

export const getMovie = title => {
    return (dispatch, getState) => {
        requestDispatcher(`http://www.omdbapi.com/?t=${title}&apikey=plzBanMe`, {
            method: 'GET'
        }).then((movie) => {
            return dispatch({ type: 'GET_MOVIE_SUCCESS', movie });
        }).catch((error) => {
            return dispatch({ type: 'ERROR', 'error': error.message });
        });
    };
};

export const addToSelected = movie => {
    return (dispatch, getState) => {
        return dispatch({ type: 'ADD_TO_SELECTED', movie });
    };
};

export const saveFavorites = () => {
    return (dispatch, getState) => {
        let state = getState();
        requestDispatcher('http://127.0.0.1:8080/movies/add', {
            method: 'POST',
            header: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            data: state.getIn(['movies', 'selected'])
        }).then(function (response) {
            return dispatch({ type: 'FAVORITES_ADD_SUCCESS', 'message': response.message });
        }).catch((error) => {
            return dispatch({ type: 'ERROR', 'error': error.message });
        });
    };
};

export const getFavorites = () => {
    return (dispatch, getState) => {
        let state = getState();
        requestDispatcher('http://127.0.0.1:8080/movies/get', {
            method: 'GET',
            header: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        }).then(function (response) {
            return dispatch({ type: 'FAVORITES_GET_SUCCESS', 'message': response.message,'payload': response.payload });
        }).catch((error) => {
            return dispatch({ type: 'ERROR', 'error': error.message });
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
