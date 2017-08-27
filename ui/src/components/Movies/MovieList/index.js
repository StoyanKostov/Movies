import React from 'react'
import Movie from '../Movie'

const MovieList = ({ title, movies, onSave }) => (
  <div className='movie-list'>
    {movies.size > 0 && title &&
      <h3>{title}</h3>
    }
    <ul>
      {movies.map((movie) => (
        <Movie key={movie.imdbID}  title={movie.Title} year={movie.Year} imdbRating={movie.imdbRating} genre={movie.Genre} onClick={() => console.log(movie.Title)} />
      ))}
    </ul>

    {movies.size > 0 && onSave &&
      <button onClick={onSave}>Save</button>
    }
  </div>
)

export default MovieList