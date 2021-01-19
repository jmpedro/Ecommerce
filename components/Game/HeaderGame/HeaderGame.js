import { size } from 'lodash';
import React, { useState, useEffect } from 'react'
import { Button, Grid, Icon, Image } from 'semantic-ui-react';
import { addToFavoriteApi, deleteGameFromFavoriteApi, isFavoriteApi } from '../../../api/favorite';
import  useAuth  from '../../../hooks/useAuth';
import classNames from 'classnames';
import { toast } from 'react-toastify';

export default function HeaderGame(props) {

    const { game } = props;
    const { poster, title } = game;
    

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
    const { auth, logout } = useAuth();
    const [isFavorite, setIsFavorite] = useState(false);
    const [reloadFavorites, setReloadFavorites] = useState(false);
    console.log(isFavorite);

    useEffect(() => {
        (async () => {

            const response = await isFavoriteApi(auth.idUser, game.id, logout);
            
            setReloadFavorites(false);

            return size(response) > 0 ? setIsFavorite(true) : setIsFavorite(false);

        })();
    }, [game, reloadFavorites]);

    const addToFavorites = async () => {

        if( auth ) {

            const response = await addToFavoriteApi(auth.idUser, game.id, logout);

            response && toast.success("Este juego ha sido añadido a favoritos");

            setReloadFavorites(true);

        }

    }

    const deleteFromFavorites = async () => {

        if( auth ) {

            await deleteGameFromFavoriteApi(auth.idUser, game.id, logout);

            setReloadFavorites(true);

        }

    }
    

    return (
        <>
            <div className="header-game_title">

                {title}
                <Icon name={isFavorite ? "heart" : "heart outline"} link className={classNames({
                    like: isFavorite
                })} onClick={isFavorite ? deleteFromFavorites : addToFavorites}/>

            </div>
            <div className="header-game_delivery">Entrega en 24/48h</div>
            <div className="header-game_summary" dangerouslySetInnerHTML={{__html: summary }} />
            <div className="header-game_buy">

                <div className="header-game_buy-price">

                    <p>Precio de venta al público: {price}€</p>

                    <div className="header-game_buy-price-actions">

                        <p>-{discount}%</p>
                        <p>{(price - Math.floor(price * discount) / 100).toFixed(2)}€</p>

                    </div>

                </div>
                <Button className="header-game_buy-btn">Comprar</Button>

            </div>

        </>
    );

}