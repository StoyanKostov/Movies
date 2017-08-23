function movieApp(state = {}, action) {
    let newState = Object.assign({}, state);
    switch (action.type) {
        case 'ADD_MOVIE':
            newState;
        case 'REMOVE_MOVIE':
            newState;
    }
    return Object.freeze( newState );
}

export default movieApp