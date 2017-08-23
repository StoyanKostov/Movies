import { connect } from 'react-redux'
import React, { Component } from 'react';
import MovieList from '../MovieList/MovieList.js';
import Movie from '../Movie/Movie.js';
import { getMovie, addToFavorites } from '../../actions/movie.js';
import { delay } from '../../helpers.js';

class Movies extends Component {
  constructor(props){
    super(props)
    this.processInputDelayed = delay((value) => {
      props.getMovie(value);
    }, 1000);
    this.processInput = this.processInput.bind(this);
  }
  processInput(e) {
    this.processInputDelayed(e.target.value);
  }
  addToFavorites(e) {
    this.processInputDelayed(e.target.value);
  }
  render() {
    let movie = this.props.movie;
    return (
      <div>
        <label>Search for movie:
          <input type="text" placeholder="Movie title" onChange={this.processInput}/>
        </label>
        { typeof movie !== 'undefined' &&
          <div>
            <ul>
              <Movie  title={movie.Title} year={movie.Year} imdbRating={movie.imdbRating} genre={movie.Genre}  onClick={() => console.log(movie.Title)} />
            </ul>
            <button onClick = { () => this.props.addToFavorites(movie) }>Add to favorites</button>
          </div>
        }
        <MovieList movies= {this.props.movies || []} onMovieClick = {id => { alert(id) }}/>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    movie: state.movie,
    movies: state.movies
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getMovie: (title) => {
      dispatch(getMovie(title))
    },
    addToFavorites: (movie) => {
      dispatch(addToFavorites(movie))
    }
  }
}

const MoviesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Movies)

export default MoviesContainer;
