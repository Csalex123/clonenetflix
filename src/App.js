import React, { useState, useEffect } from 'react';
import Tmdb from './Tmdb';

import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';

import './global.css';

function App() {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);

  useEffect(() => {

    const loadAll = async () => {
      //Pegando a lista Total de filmes
      const list = await Tmdb.getHomeList();
      setMovieList(list);

      //Pegando o Filme de Destaque do cabeçalho,
      const originals = list.filter((i) => i.slug === 'originals');
      const randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      const movie = originals[0].items.results[randomChosen];
      const chosenInfo = await Tmdb.getMovieInfo(movie.id, 'tv');
      setFeaturedData(chosenInfo);
    }

    loadAll();
  }, []);

  return (
    <div className="page">

      {featuredData &&
        <FeaturedMovie item={featuredData} />
      }
      
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
