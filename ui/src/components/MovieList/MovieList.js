import React from 'react'
import PropTypes from 'prop-types'
import Movie from '../Movie/Movie.js'

const MovieList = ({ favorites, onSave }) => (
  <div>
    <ul>
      {favorites.map(movie => (
        <Movie title={movie.Title} year={movie.Year} imdbRating={movie.imdbRating} genre={movie.Genre} onClick={() => console.log(movie.Title)} />
      ))}
    </ul>
    {favorites.length > 0 &&
      <button onClick={onSave}>Save</button>
    }
  </div>
)

MovieList.propTypes = {
  favorites: PropTypes.arrayOf(
    PropTypes.shape({
      onClick: PropTypes.func,
      Title: PropTypes.string.isRequired,
      Year: PropTypes.string.isRequired,
      imdbRating: PropTypes.string.isRequired,
      Genre: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  onSave: PropTypes.func.isRequired
}

export default MovieList