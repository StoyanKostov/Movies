// http://omdbapi.com/
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

export const getMovieSuccess = movie => {
    return {
        type: 'GET_MOVIE_SUCCESS',
        receivedAt: Date.now(),
        movie
    };
}

export const addToFavorites = movie => {
    return {
        type: 'ADD_TO_FAVORITES',
        movie
    };
};

export const removeMovie = id => {
    return {
        type: 'REMOVE_MOVIE',
        id
    };
};
