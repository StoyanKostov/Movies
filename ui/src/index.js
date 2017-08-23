import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import movieApp from './reducers';
import Root from './components/Root';
import registerServiceWorker from './registerServiceWorker';

let store = createStore(movieApp, Object.freeze({"favorites": []}), compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));
render(
    <Root store={store} />,
    document.getElementById('root')
)
registerServiceWorker();
