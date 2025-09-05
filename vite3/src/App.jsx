import { useState, useEffect } from 'react'
import './App.css'
import {nanoid} from "nanoid"

function App() {
  const [title, setTitle] = useState('');
  const genreList = {
    horror: "Ужасы",
    drama: "Драма",
    boevik: "Боевик",
    triller: "Триллер",
    fantazi: "Фантастика",
    dokymental: "Документальный",
    dr: "Другое",
  }
  const [genre, setGenre] = useState(Object.values(genreList)[1[0]]);
  const [rating, setRating] = useState(5); 
  const [overview, setOverview] = useState('');
  const [filterGenre, setFilterGenre] = useState('');
  const [string, setString] = useState("")
}

  const Filter = (event) => {
    setFilterGenre(event.target.value);
  };

  const deleteMovie = (movieId) => {
    setMovies(movies.filter(movie => movie.id !== movieId));
  };

  const AddMovie = () => {
    const movie = {
      title: string,
      id: nanoid(),
      date: new Date(),
      rating: rating,
      overview: string,
      movie: movie
    }

  const resetForm = () => {
    setTitle('');
    setGenre('drama');
    setRating(5);
    setOverview('');
  };

    const handleChange = (e) => {
    setString(e.target.value)
  }

  return (
    <div className="movie">
      <div className="input">
       <input onChange={handleChange} value={string} type="text" />
       <select onChange={genreList} name="" id="">
        {Object.entries(movies).map((el)=>(
          <option value={el[0]} key={el[0]} >{el[1]}</option>
        ))}
       </select>
       <button onClick={AddMovie}>Добавить фильм</button>
      </div>
      <div className='movie__filter'>
        <span>Краткое описание:</span>
        <input type="text"
        value={filterString}
        onChange={(el)=> setfilterString(el.target.value)} />
      </div>
      <div className="movie-list">
        {filteredBookmarks.map((el) => (
          <div className='movie' key={el.id}>
            <input />
            <span className='movie__title'>{el.title}</span>
            <span className='movie__genre'>{genreList[el.genre]}</span>
            <span className='movie__date'>{el.date.toISOString()}</span>
            <button className='movie__delete' onClick={ () => deleteMovie(el.id)}>x</button>
          </div>
        ))}
        </div>
    </div>
      
  )
}

export default App
