import React, { useState, useEffect } from 'react'
import { size } from 'lodash';
import { Loader } from 'semantic-ui-react'
import BasicLayout from "../layouts/BasicLayout";
import { getLastGamesApi } from '../api/game';
import ListGames from '../components/ListGames/ListGames';

export default function Home() {

  const [games, setGames] = useState(null);
  console.log(games);
  // Traemos los juegos de la base de datos
  useEffect(() => {
    (async () => {

      const response = await getLastGamesApi(40);

      size(response) > 0 ? setGames(response) : setGames([]);

    })();
  }, [])

  return (
    <BasicLayout className="home">

      {/* Mientras que games devuelva nulo, se estará mostrando el Loader */}
      {!games && <Loader active><h3>Cargando juegos</h3></Loader>}
      
      {/* Si games no es nulo, pero su tamaño es igual a 0, significa que no hay juegos */}
      {games && size(games) === 0 && (
        <div><h3>Lo sentimos, no hay juegos disponibles en este momento</h3></div>
      )}

      {/* Si el tamaño de games es mayor a cero, signific que habra juegos */}
      {size(games) > 0 && <ListGames games={games} />}

    </BasicLayout>
  )
}
