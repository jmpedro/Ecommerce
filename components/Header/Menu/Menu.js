import React, { useState, useEffect } from 'react';
import { Container, Menu as MenuWeb, Grid, Icon, Label } from 'semantic-ui-react';
import Link from 'next/link';
import BasicModal from '../../Modal/BasicModal';
import { map } from 'lodash';
import Auth from '../../Auth';
import useAuth from '../../../hooks/useAuth';
import useCart from '../../../hooks/useCart';
import { getMeApi } from '../../../api/users';
import { getPlatformsApi } from '../../../api/platforms';

export default function Menu() {

    const [showModal, setShowModal] = useState(false)
    const [titleModal, setTitleModal] = useState("Iniciar sesión");
    const [platforms, setPlatforms] = useState([]);
    // declaramos un useState para setear los valores al usuario 
    const [user, setUser] = useState(undefined);
    // obtenemos los valores del inicio de sesion y de logout desde useAuth
    const { auth, logout } = useAuth();
    

    // hacemos un useEffect asincronico y que se llame a si mismo para obtener los datos del usuario 
    useEffect(() => {
        (async () => {

            const response = await getMeApi(logout);
            setUser(response);

        })();
    }, [auth])// Este useEffect se ejecutara cuando el usuario sea distinto(valor obtenido de auth)ç

    // hacemos un useEffect para obtener todas las plataformas de videojuegos
    useEffect(() => {
        ( async () => {

            const response = await getPlatformsApi();
            setPlatforms(response || []);

        })();
    }, []);

    const onShowModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false)

    return (
        <div className="menu">
            <Container>
                <Grid>

                    <Grid.Column className="menu_left" width={6} >

                        <Multiplatforms platforms={platforms}/>

                    </Grid.Column>
                    <Grid.Column className="menu_right" width={10} >

                        { user !== undefined && <Options onShowModal={onShowModal} user={user} logout={logout} /> }

                    </Grid.Column>
                </Grid>
            </Container>

            <BasicModal show={showModal} setShow={setShowModal} title={titleModal} size="small" >
                <Auth  closeModal={closeModal} setTitleModal={setTitleModal}  />
            </BasicModal>
        </div>
    )
}

// Plataformas
function Multiplatforms(props) {

    const { platforms } = props;

    return (
        <MenuWeb>

            {map(platforms, (platform) => (

                <Link href={`/games/${platform.url}`} key={platform._id}>

                    <MenuWeb.Item as="a" name={platform.url}>{platform.title}</MenuWeb.Item>

                </Link>

            ))}

        </MenuWeb>
    );
}

// Menu de opciones
function Options(props) {

    const { onShowModal, user, logout } = props;
    const { productsCart } = useCart();

    return (
        <MenuWeb>
            { 
            user ? (<>
            
            {/* Pedidos */}
            <Link href="/orders">
               <MenuWeb.Item as="a">
                   <Icon name="game"/>
                   Mis pedidos
                </MenuWeb.Item>
            </Link>

            {/* Deseados */}
            <Link href="/whislist">
               <MenuWeb.Item as="a">
                   <Icon name="heart outline"/>
                   Deseados
                </MenuWeb.Item>
            </Link>

            {/* Configuracion de cuenta */}
            <Link href="/account">
               <MenuWeb.Item as="a" >
                   <Icon name="user outline"/>
                   {user.name} {user.lastname}
                </MenuWeb.Item>
            </Link>

            {/* Carrito */}
            <Link href="/cart">
               <MenuWeb.Item as="a" className="m-0">
                   <Icon name="cart"/>
                        {productsCart > 0 && (
                            <Label color="red" floating circular>
                                {productsCart}    
                            </Label>
                        )}
                   
                   
                </MenuWeb.Item>
            </Link>


            <MenuWeb.Item className="m-0" onClick={logout}><Icon name="power off"/></MenuWeb.Item>
            
            </>)
             :(
             <MenuWeb.Item onClick={onShowModal}>
                <Icon name="user outline" />
                Mi cuenta
            </MenuWeb.Item> )
            
            }
        </MenuWeb>
    );

}
