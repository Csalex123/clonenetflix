import React, { useState, useEffect } from 'react';
import Tmdb from './Tmdb';

import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Menu';

import './global.css';

function App() {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [activeHeader, setactiveHeader] = useState(false);

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

  useEffect(() => {

    //Scroll Menu
    const scrollListener = () => {

      if (window.scrollY > 50) {
        setactiveHeader(true);
      } else {
        setactiveHeader(false);
      }

    }

    window.addEventListener('scroll', scrollListener);

    /* Removendo evendo após sair da página */
    return () => {
      window.removeEventListener('scroll', scrollListener);
    }

  }, []);

  return (
    <div className="page">

      <Header active={activeHeader} />

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

      <footer>
        Feito com amor por Alex Ricardo <br />
        Direitos de imagem para Netflix <br />
        Dados pegos do site Themoviedb.org
      </footer>

      {movieList.length <= 0 && (
        <div className="loading">
          <img src={'https://www.filmelier.com/pt/br/news/wp-content/uploads/2020/03/netflix-loading.gif'} alt="carregando" />
        </div>
      )}
    </div>
  );
}

export default App;
