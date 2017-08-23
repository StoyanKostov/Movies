function movieApp(state, action) {
    let newState = Object.assign({}, state);
    switch (action.type) {
        case 'GET_MOVIE_SUCCESS':
            newState.movie = action.movie;
            break;
        case 'ADD_TO_FAVORITES':
            newState.movies.push(action.movie);
            break;
        case 'REMOVE_MOVIE':
    }
    return Object.freeze(newState);
}

export default movieApp