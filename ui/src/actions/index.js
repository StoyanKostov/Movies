export const getMovie = id => {
    return (dispatch, getState) => {
        alert( 'getMovie' );
      }
}

export const addMovie = id => {
    return {
        type: 'ADD_MOVIE',
        id
    }
}

export const removeMovie = id => {
    return {
        type: 'REMOVE_MOVIE',
        id
    }
}