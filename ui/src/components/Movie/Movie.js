import React from 'react'
import PropTypes from 'prop-types'

const Movie = ({ title, year, imdbRating, genre, onClick }) => (
  <li onClick={onClick} >
    <p>Title: <b>{title}</b></p>
    <p>Year: <b>{year}</b></p>
    <p>imdb Rating: <b>{imdbRating}</b></p>
    <p>Genre: <b>{genre}</b></p>
  </li>
)

Movie.propTypes = {
  onClick: PropTypes.func,
  title: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  imdbRating: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired
}

export default Movie