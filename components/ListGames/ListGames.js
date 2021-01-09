import React from 'react'
import { map } from 'lodash';
import { Grid, Image } from 'semantic-ui-react';
import Link from 'next/link';

export default function ListGames(props) {

    const { games } = props;

    return (
        <div className="list-games">
            
            <Grid>
                <Grid.Row columns={4}>

                    { map(games, (game) => (

                        <Game game={game} />

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

            <Link href={`/${game.url}`}>
            
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
