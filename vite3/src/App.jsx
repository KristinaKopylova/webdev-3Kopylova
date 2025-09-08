import { useState, useEffect } from 'react';
import './App.css';
import { nanoid } from 'nanoid';

const genres = [
  'Драма',
  'Комедия',
  'Боевик',
  'Триллер',
  'Фантастика',
  'Ужасы',
  'Документальный',
  'Другое'
];

function App() {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState(genres[0]);
  const [rating, setRating] = useState(5);
  const [overview, setOverview] = useState('');

  // Массив фильмов
  const [movies, setMovies] = useState([]);

  const [filterGenre, setFilterGenre] = useState('');

  //добавление фильма
  const addMovie = () => {
    if (!title.trim()) return alert("Введите название");
    
    const newMovie = {
      id: nanoid(),
      title,
      genre,
      rating,
      overview,
      addedAt: new Date()
    };

    setMovies([...movies, newMovie]);
    resetForm();
  };

  // Очистка формы
  const resetForm = () => {
    setTitle('');
    setGenre(genres[0]);
    setRating(5);
    setOverview('');
  };

  // Удаление фильма
  const deleteMovie = (id) => {
    setMovies(movies.filter(movie => movie.id !== id));
  };

  //чтобы изменений жанра фильтра
  const handleFilterChange =e=> {
    setFilterGenre(e.target.value);
  };

  //фильтр списока фильмов
  const [filteredMovies, setFilteredMovies] = useState([...movies])
  const [filterRating, setFilterRating] = useState(0)
  useEffect(() => {
    setFilteredMovies(() => {
      let filtered = movies
      console.log(filtered);
      
      if (filterGenre) {
       filtered =  movies.filter(movie => movie.genre===filterGenre)
      }
      console.log(filtered);
  
          if (filterRating != 0) {
        filtered = filtered.filter(movie => movie.rating===filterRating);

      }
      console.log(filtered);
      return filtered
    })
  }, [filterGenre, filterRating, movies])

  return (
    <div className="app">
      <form className="add-movie-form">
        <label htmlFor="title">Название фильма:</label>
        <input type="text" value={title} onChange={e=>setTitle(e.target.value)} />
        <label htmlFor="genre">Жанр:</label>
        <select value={genre} onChange={e => setGenre(e.target.value)}>
          {genres.map(g => (
            <option key={g}>{g}</option>
          ))}
        </select>
        
        <label htmlFor="rating">Оценка:</label>
        <input type="range" min="1" max="5" step="1" value={rating} onChange={e => setRating(parseInt(e.target.value))}
        /> ({rating})
        
        <label htmlFor="overview">Краткий обзор:</label>
        <textarea rows="4" cols="50" value={overview} onChange={e => setOverview(e.target.value.substring(0, 500))} />
        <button type="button" onClick={addMovie}>Добавить фильм</button>
      </form>

      <h2>Список фильмов</h2>
      <div className="movies-filter">
        <label htmlFor="filter-genre">Выберите жанр:</label>
        <select value={filterGenre} onChange={handleFilterChange}>
          <option value="">Все жанры</option>
          {genres.map(g => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
         <input type="range" min="0" max="5" step="1" value={filterRating} onChange={e => setFilterRating(parseInt(e.target.value))}
        /> ({filterRating})
      </div>

      <ul className="movies-list">
        {filteredMovies.map(movie => (
          <li key={movie.id} className="movie-card">
            <strong>{movie.title}</strong><br/>
            {Array(Math.round(movie.rating)).fill('★').join('')}<br/>
            Дата добавления:{new Intl.DateTimeFormat('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' }).format(movie.addedAt)}<br/>
            Описание :{movie.overview.slice(0, 100)}{movie.overview.length > 100 ? '...' : ''}<br/>
            <button onClick={() => deleteMovie(movie.id)}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;