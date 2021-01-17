import React from 'react'
import { map, size } from 'lodash';
import { Grid, Image } from 'semantic-ui-react';
import Link from 'next/link';
import useWindowSize from '../../hooks/useWindowSize';
import {
    breakpointUpSm,
    breakpointUpMd,
    breakpointUpLg
} from '../../utils/breakpoint';

export default function ListGames(props) {

    const { games } = props;
    
    const { width } = useWindowSize();

    // Establecemos la cantidad de columnas para la pagina en función de su ancho
    const getColumnsRender = () => {
        switch (true) {
            case width > breakpointUpLg:
                return 4;
            case width > breakpointUpMd:
                return 3;
            case width > breakpointUpSm:
                return 2;
            default:
                return 1;
        }
    }

    return (
        <div className="list-games">
            
            <Grid>
                <Grid.Row columns={getColumnsRender()}>
                    
                    { map(games, (game) => (
                        
                        <Game game={game} key={game._id} />
                        
                    )) }

                </Grid.Row>
            </Grid>
            
        </div>
    )
}

function Game(props) {

    const { game } = props;
    

    return(
        
        <Grid.Column className="list-games_game">

            <Link href={`/${game.url}`} >
            
                <a>
                    <div className="list-games_game-poster">
                        <Image src={game.poster.url} alt={game.title} />
                        
                        <div className="list-games_game-poster-info">
                            {/* Si tiene descuento entonces lo aplicamos con un span */}
                            {game.discount ? (
                                <span className="discount">-{game.discount}%</span>
                            ) : (
                                <span/>
                            )}

                            <span className="price" >{game.price}€</span>
                        </div>
                    </div>
                    <h2>{game.title}</h2>
                </a>

            </Link>

        </Grid.Column>

    );

}
