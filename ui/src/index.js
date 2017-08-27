import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Map, Set } from 'immutable';
import movieApp from './reducers';
import Root from './components/Root';
import registerServiceWorker from './registerServiceWorker';

const initialState = Map({
    user: Map(),
    movies: Map({
        movie: {},
        selected: Set(),
        favorites: Set()
    })
})

let store = createStore(movieApp, initialState, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
));
render(
    <Root store={store} />,
    document.getElementById('root')
)
registerServiceWorker();
