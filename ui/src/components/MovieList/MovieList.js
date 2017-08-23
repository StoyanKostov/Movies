import React from 'react'
import PropTypes from 'prop-types'
import Movie from '../Movie/Movie.js'

const MovieList = ({ movies, onMovieClick }) => (
  <ul>
    {movies.map(movie => (
      <Movie id={movie.id} description={movie.description} onClick={() => onMovieClick(movie.id)} />
    ))}
  </ul>
)

MovieList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      description: PropTypes.bool.isRequired,
    }).isRequired
  ).isRequired,
  onMovieClick: PropTypes.func.isRequired
}

export default MovieList