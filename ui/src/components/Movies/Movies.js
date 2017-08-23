import { connect } from 'react-redux'
import React, { Component } from 'react';
import MovieList from '../MovieList/MovieList.js';
import { getMovie } from '../../actions';

class Movies extends Component {
  render() {
    return (
      <div>
        <button onClick = { () => this.props.getMovies() }>Get movie</button>
        <MovieList movies= {this.props.movies || []} onMovieClick = {id => { alert(id) }}/>
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
