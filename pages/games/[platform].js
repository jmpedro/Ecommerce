import React, { useState, useEffect } from 'react';
import BasicLayout from '../../layouts/BasicLayout';
import { useRouter } from 'next/router';
import { getGamesFromPlatformApi, getTotalGamesFromPlatformApi } from '../../api/game';
import ListGames from '../../components/ListGames/ListGames';
import { Loader } from 'semantic-ui-react';
import { size } from 'lodash';
import Pagination from '../../components/Pagination';

const limitPerPage = 10;

export default function Platform() {

    const { query } = useRouter();
    const [games, setGames] = useState(null);
    const [totalGames, setTotalGames] = useState(null);

    /* FUNCIONES DEL COMPONENTE */
    // Funcion para controlar la paginación
    const getStartItem = () => {

        // el page que obtenemos de query es un dato que vamos a crear para las paginas
        const currentPage = parseInt(query.page);
        
        if( !query.page || currentPage === 1 ) return 0;
        else return currentPage * limitPerPage - limitPerPage;

    }
    
    /* FUNCIONES DE USE EFFECT */
    // Hacemos un useEffect que se ejecute cada vez que query cambie, es decir, cada vez que cambiemos de platform
    useEffect(() => {
        (async () => {

            const response = await getGamesFromPlatformApi(query.platform, limitPerPage, getStartItem());
            setGames(response || []);

        })();
    }, [query]);

    // Hacemos un useEffect para obtener el total de juegos que hay en cada plataforma
    useEffect(() => {
        (async () => {

            const response = await getTotalGamesFromPlatformApi(query.platform);
            setTotalGames(response || []);

        })();
    }, [query]);

    return (
        <BasicLayout className="platform">
            
            {/* Mientras que games devuelva nulo, se estará mostrando el Loader */}
            {!games && <Loader active><h3>Cargando juegos</h3></Loader>}
            
            {/* Si games no es nulo, pero su tamaño es igual a 0, significa que no hay juegos */}
            {games && size(games) === 0 && (
                <div><h3>Lo sentimos, no hay juegos disponibles en este momento</h3></div>
            )}

            {/* Si el tamaño de games es mayor a cero, signific que habra juegos */}
            {size(games) > 0 && <ListGames games={games} />}
            
            {totalGames ? (

                <Pagination totalGames={totalGames} limitPerPage={limitPerPage} page={ query.page ? parseInt(query.page) : 1} />

            ) : null}

        </BasicLayout>
    )
}
