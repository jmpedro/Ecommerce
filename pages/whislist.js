import React, { useState, useEffect } from 'react';
import { size, forEach } from 'lodash';
import BasicLayout from '../layouts/BasicLayout';
import useAuth from '../hooks/useAuth';
import { getFavoritesApi } from '../api/favorite';
import { Loader } from 'semantic-ui-react';
import ListGames from '../components/ListGames';
import useCart from '../hooks/useCart';
import Seo from '../components/Seo';

export default function whislist() {

    const { auth, logout } = useAuth();
    const [games, setGames] = useState(null);


    useEffect(() => {
        (async () => {
            
            const response = await getFavoritesApi(auth.idUser, logout);
            
            // Como response contiene dentro de el a games como un objeto, debemos de obtenerlo
            if( size(response) > 0 ) {

                const listGamesTemp = [];

                forEach(response, (data) => {

                    listGamesTemp.push(data.game);

                });

                setGames(listGamesTemp);

            }else {

                setGames([]);

            }

        })();
    }, [games]);

    return (
        <BasicLayout className="whislist">

            <Seo title="Favoritos" />
            
            <div className="whislist_block">

                <div className="title">Lista de deseos</div>

                <div className="data">
                
                    {!games && <Loader active>Cargando juegos</Loader>}

                    {games && size(games) === 0 && (
                        <div className="data_not-found">
                            <h3>No tienes juegos en tu lista de deseos</h3>
                        </div>
                    )}

                    {size(games) > 0 && <ListGames games={games} />}
                    
                
                </div>

            </div>

        </BasicLayout>
    )
}
