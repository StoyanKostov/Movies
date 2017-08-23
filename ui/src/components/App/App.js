import React, { Component } from 'react';
import MoviesContainer from '../Movies/Movies.js'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <MoviesContainer/>
      </div>
    );
  }
}

export default App;
