import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Router, Route, IndexRedirect, browserHistory } from 'react-router';
import App from './App';
import User from './User';
import Login from './User/Login';
import Register from './User/Register';
import MoviesContainer from './Movies';

const Root = ({ store }) => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/user" component={User} />
        <Route path="/movies" component={MoviesContainer} />
      </Route>
    </Router>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root