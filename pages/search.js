import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { size } from 'lodash';
import { Loader } from 'semantic-ui-react';
import BasicLayout from '../layouts/BasicLayout';
import { searchGamesApi } from '../api/game';
import ListGames from '../components/ListGames';


export default function search() {

    const { query } = useRouter();
    const [games, setGames] = useState(null);
    console.log(games);

    // Con este useEffect hacemos focus sobre el input de busqueda
    useEffect(() => {

        document.getElementById("search-game").focus();

    }, []);

    // Con este useEffect llamamos a la funcion del servidor que se encarga de buscar coincidencias con los juegos
    useEffect(() => {
        (async () => {

            if( size(query.q) > 0 ) {

                const response = await searchGamesApi(query.q);
                size(response) > 0 ? setGames(response) : setGames([]);

            }else {

                setGames([]);

            }

        })();
    }, [query])



    return (
        <BasicLayout className="search">

            {!games && <Loader active>Cargando juegos</Loader>}

            {games && size(games) === 0 && (
                <div className="data_not-found">
                    <h3>No hay juegos que coincidan con tu busqueda</h3>
                </div>
            )}

            {size(games) > 0 && <ListGames games={games} />}
            
        </BasicLayout>
    )
}
