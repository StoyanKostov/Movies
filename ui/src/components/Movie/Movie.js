import React from 'react'
import PropTypes from 'prop-types'

const Movie = ({ id, description, onClick }) => (
  <li onClick={onClick} >
    {description}
  </li>
)

Movie.propTypes = {
  onClick: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired
}

export default Movie