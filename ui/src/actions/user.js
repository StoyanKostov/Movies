import { requestDispatcher } from '../utils.js';
import { getFavorites } from './movie.js';

export const register = (user) => {
    return (dispatch, getState) => {
        let state = getState();
        requestDispatcher('http://127.0.0.1:8080/user/create', {
            method: 'POST',
            header: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            data: user
        }).then(function (response) {
            return dispatch({ type: 'REGISTER_USER_SUCCESS', 'message': response.message });
        }).catch((error) => {
            return dispatch({ type: 'ERROR', 'error': error.message });
        });
    };
};

export const login = (user) => {
    return (dispatch, getState) => {
        let state = getState();
        requestDispatcher('http://127.0.0.1:8080/user/login', {
            method: 'POST',
            header: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            data: user
        }).then(function (response) {
            return dispatch({ type: 'LOGIN_USER_SUCCESS', 'message': response.message, 'payload': response.payload });
        }).then(function () {
            return dispatch(getFavorites());
        }).catch((error) => {
            return dispatch({ type: 'ERROR', 'error': error.message });
        });
    };
};
