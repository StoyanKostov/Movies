export const requestDispacher = store => next => action => {
    if(typeof action.url !== 'undefined'){

    } 
    return next(action);
}