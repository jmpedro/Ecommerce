import React, {useState, useEffect} from 'react';
import BasicLayout from '../layouts/BasicLayout';
import { useRouter } from 'next/router';
import { getGameByUrlApi } from '../api/game';
import HeaderGame from '../components/Game/HeaderGame/HeaderGame';
import { Loader } from 'semantic-ui-react';
import TabsGame from '../components/Game/TabsGame/TabsGame';


export default function Game() {

    const [game, setGame] = useState(null);
    const { query } = useRouter();
    
    useEffect(() => {
        (async () => {

            const response = await getGameByUrlApi(query.game);
            setGame(response);

        })();
    }, [query])

    if( !game ) return (<Loader active><h3>Cargando juego</h3></Loader>)
    
    return (
        <BasicLayout>
            
            <HeaderGame game={game} />

            <TabsGame game={game} />

        </BasicLayout>
    )
}
