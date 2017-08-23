import React from 'react'
import PropTypes from 'prop-types'

const Movie = ({ id, title, description, onClick }) => (
  <li onClick={onClick} >
    {title}
    {description}
  </li>
)

Movie.propTypes = {
  onClick: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired
}

export default Movie