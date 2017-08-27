import { connect } from 'react-redux';
import React, { Component } from 'react';
import MovieList from './MovieList';
import Movie from './Movie';
import { getMovie, addToSelected, saveFavorites } from '../../actions/movie.js';
import { delay } from '../../utils.js';

class Movies extends Component {
  constructor(props) {
    super(props)
    this.processInputDelayed = delay((value) => {
      props.getMovie(value);
    }, 1000);
    this.processInput = this.processInput.bind(this);
  }
  processInput(e) {
    this.processInputDelayed(e.target.value);
  }
  render() {
    let movie = this.props.movie;
    return (
      <div>
        <MovieList title={'Favorites'} movies={this.props.favorites} />
        <h2>Movies</h2>
        <label>Search for movie:
          <input type="text" placeholder="Movie title" onChange={this.processInput} />
        </label>
        {typeof movie['Title'] !== 'undefined' &&
          <div>
            <ul>
              <Movie title={movie['Title']} year={movie['Year']} imdbRating={movie['imdbRating']} genre={movie['Genre']} onClick={() => console.log(movie.Title)} />
            </ul>
            <button onClick={() => this.props.addToSelected(movie)}>Add to selected</button>
          </div>
        }
        <MovieList title={'Selected'} movies={this.props.selected} onSave={this.props.saveFavoritesHandler} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    movie: state.getIn(['movies', 'movie']),
    selected: state.getIn(['movies', 'selected']),
    favorites: state.getIn(['movies', 'favorites'])
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getMovie: (title) => {
      dispatch(getMovie(title))
    },
    addToSelected: (movie) => {
      dispatch(addToSelected(movie))
    },
    saveFavoritesHandler: () => {
      dispatch(saveFavorites())
    }
  }
}

const MoviesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Movies)

export default MoviesContainer;
