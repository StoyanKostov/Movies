import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import movieApp from './reducers';
import Root from './components/Root';
import { requestDispacher } from './middleWares';

import registerServiceWorker from './registerServiceWorker';

let store = createStore(movieApp, applyMiddleware(requestDispacher));
render(
    <Root store={store} />,
    document.getElementById('root')
)
registerServiceWorker();
