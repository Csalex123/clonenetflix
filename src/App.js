import React, { useState, useEffect } from 'react';
import Tmdb from './Tmdb';

import MovieRow from './components/MovieRow'

function App() {

  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const loadAll = async () => {
      //Pegando a lista total
      let list = await Tmdb.getHomeList();
      setMovieList(list);

    }

    loadAll();
  }, []);

  return (
    <div className="page">
      <section className="lists">
        {
          movieList.map((item, key) => (
              <MovieRow key={key} title={item.title} items={item.items} />
          ))
        }
      </section>
    </div>
  );
}

export default App;
