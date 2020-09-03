import React, {  useEffect } from 'react';
import Tmdb from './Tmdb';

function App() {

  useEffect(() => {
    const loadAll = async () => {
      //Pegando a lista total
      let list = await Tmdb.getHomeList();
      console.log(list);
    }

    loadAll();
  }, []);

  return (
    <>
      <h1>Hello World</h1>
    </>
  );
}

export default App;
