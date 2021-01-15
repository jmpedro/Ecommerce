import React from 'react'
import { Button, Grid, Icon, Image } from 'semantic-ui-react';

export default function HeaderGame(props) {

    const { game } = props;
    const { poster, title } = game;
    console.log(game);

    return (
        <Grid className="header-game">

            <Grid.Column mobile="16" tablet="6" computer="5"  >
                <Image src={poster.url} alt={title} />
            </Grid.Column>
            
            <Grid.Column mobile="16" tablet="10" computer="11"  >
                <Info game={game}/>
            </Grid.Column>

        </Grid>
    )
}

function Info(props) {

    const { game } = props;
    const { title, summary, price, discount } = game;

    return (
        <>
            <div className="header-game_title">

                {title}
                <Icon name="heart outline" link />

            </div>
            <div className="header-game_delivery">Entrega en 24/48h</div>
            <div className="header-game_summary" dangerouslySetInnerHTML={{__html: summary }} />
            <div className="header-game_buy">

                <div className="header-game_buy-price">

                    <p>Precio de venta al público: {price}€</p>

                    <div className="header-game_buy-price-actions">

                        <p>-{discount}%</p>
                        <p>{price - Math.floor(price * discount) / 100}€</p>

                    </div>

                </div>
                <Button className="header-game_buy-btn">Comprar</Button>

            </div>

        </>
    );

}