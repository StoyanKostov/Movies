import { Map, Set } from 'immutable';
import { browserHistory } from 'react-router'

function movieApp(state, action) {
    switch (action.type) {
        case 'GET_MOVIE_SUCCESS':
            return state.setIn(['movies', 'movie'], action.movie);
        case 'ADD_TO_SELECTED':
            return state.updateIn(['movies', 'selected'], selected => selected.add(action.movie));
        case 'FAVORITES_ADD_SUCCESS':
            alert(action.message);
            state = state.updateIn(['movies', 'favorites'], favorites => favorites.union(state.getIn(['movies', 'selected'])));
            return state.updateIn(['movies', 'selected'], selected => selected.clear());
        case 'LOGIN_USER_SUCCESS':
            alert(action.message);
            browserHistory.push('/movies')
            return state.set('user', Map(action.payload));
        case 'REGISTER_USER_SUCCESS':
            alert(action.message);
            return state;
        case 'FAVORITES_GET_SUCCESS':
            alert(action.message);
            return  state.setIn(['movies', 'favorites'], Set(action.payload));
        case 'ERROR':
            alert(action.error);
        default:
            return state;
    }
}

export default movieApp