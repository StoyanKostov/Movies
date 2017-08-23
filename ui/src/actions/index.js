// http://omdbapi.com/
export const getMovie = id => {
    return (dispatch, getState) => {
        return fetch('https://facebook.github.io/react-native/movies.json').then((response) => response.json())
        .then(movie => {
            return dispatch({ type: 'GET_MOVIE_SUCCESS', movie });
        }).catch(error => {
            return error;
        });
    };
};

export function getMovieSuccess(movie) {
    return {
        type: 'GET_MOVIE_SUCCESS',
        receivedAt: Date.now(),
        movie
    };
}

export const addMovie = id => {
    return {
        type: 'ADD_MOVIE',
        id
    };
};

export const removeMovie = id => {
    return {
        type: 'REMOVE_MOVIE',
        id
    };
};
