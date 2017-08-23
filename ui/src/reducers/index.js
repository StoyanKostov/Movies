function movieApp(state, action) {
    let newState = {};
    switch (action.type) {
        case 'GET_MOVIE_SUCCESS':
            newState = Object.assign({}, state, {
                movies: action.movie.movies
            });
            break;
        case 'ADD_MOVIE':
        case 'REMOVE_MOVIE':
    }
    return Object.freeze( newState );
}

export default movieApp