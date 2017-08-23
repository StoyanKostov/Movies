import { connect } from 'react-redux'
import React, { Component } from 'react';
import MovieList from '../MovieList/MovieList.js';
import { getMovie } from '../../actions';

let movies = [
  {id: 1, description: "my description 1", onMovieClick: id => { alert(id) }},
  {id: 2, description: "my description 2", onMovieClick: id => { alert(id) }}
];

class Movies extends Component {
  render() {
    return (
      <div>
        <button onClick = { () => this.props.getMovies() }>Get movie</button>
        <MovieList movies= {movies} onMovieClick = {id => { alert(id) }}/>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    movies: state.movies
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getMovies: () => {
      dispatch(getMovie())
    }
  }
}

const MoviesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Movies)

export default MoviesContainer;
