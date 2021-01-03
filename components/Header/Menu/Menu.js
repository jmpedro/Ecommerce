import React, { useState, useEffect } from 'react';
import { Container, Menu as MenuWeb, Label, Grid, Icon } from 'semantic-ui-react';
import Link from 'next/link';
import BasicModal from '../../Modal/BasicModal';
import Auth from '../../Auth';
import useAuth from '../../../hooks/useAuth';
import { getMeApi } from '../../../api/users';

export default function Menu() {

    const [showModal, setShowModal] = useState(false)
    const [titleModal, setTitleModal] = useState("Iniciar sesión");
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
    }, [auth])// Este useEffect se ejecutara cuando el usuario sea distinto(valor obtenido de auth)

    const onShowModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false)

    return (
        <div className="menu">
            <Container>
                <Grid>

                    <Grid.Column className="menu_left" width={6} >

                        <Multiplatforms/>

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
function Multiplatforms() {

    return (
        <MenuWeb>
            <Link href="/play-station">
                <MenuWeb.Item as="a">Playstation</MenuWeb.Item>
            </Link>

            <Link href="/xbox">
                <MenuWeb.Item as="a">Xbox</MenuWeb.Item>
            </Link>

            <Link href="/switch">
                <MenuWeb.Item as="a">Switch</MenuWeb.Item>
            </Link>
        </MenuWeb>
    );
}

// Menu de opciones
function Options(props) {

    const { onShowModal, user, logout } = props;

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
