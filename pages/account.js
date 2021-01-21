import React, { useState, useEffect } from 'react'
import BasicLayout from '../layouts/BasicLayout';
import { useRouter } from 'next/router';
import { getMeApi } from '../api/users';
import useAuth from '../hooks/useAuth';
import ChangeAccount from '../components/Account';
import ChangeEmail from '../components/Account/ChangeEmail';
import ChangePassword from '../components/Account/ChangePassword';
import { Icon } from 'semantic-ui-react';
import BasicModal from '../components/Modal/BasicModal'
import Address from '../components/Account/Address';
import ListAddress from '../components/Account/ListAddress/ListAddress';
import Seo from '../components/Seo';

export default function Account() {

    // declaramos los props y los useState
    const [user, setUser] = useState(undefined);
    const router = useRouter();
    const { auth, logout, setReloadUser } = useAuth();

    // comprobamos que el usuario este logeado
    useEffect(() => {
        (async () => {

            const response = await getMeApi(logout);
            setUser(response || null);

        })();
    }, [auth])

    if( user === undefined ) return null;
    // si no hay ningun usuario entonces lo devolvemos al home
    if( !user && !auth ) {
        router.replace("/");
        return null;
    }

    return (
        <BasicLayout className="account">

            <Seo title="Mi cuenta" />
            <Configuration user={user} logout={logout} setReloadUser={setReloadUser} />
            <Adresses />

        </BasicLayout>
    )
}

// Configuracion de la cuenta
function Configuration(props) {

    const { user, logout, setReloadUser } = props;

    return (
        <div className="account_configuration">

            <div className="title">

                Configuración

            </div>

            <div className="data">

                <ChangeAccount user={user} logout={logout} setReloadUser={setReloadUser} />
                <ChangeEmail user={user} logout={logout} setReloadUser={setReloadUser} />
                <ChangePassword user={user} logout={logout} />

            </div>

        </div>
    );

}

// Direcciones de la cuenta
function Adresses() {

    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState("");
    const [formModal, setFormModal] = useState(null);
    const [reloadAddress, setReloadAddress] = useState(false);

    // Funcion para añadir una nueva direccion
    const newAdress = (title, address) => {
        setShowModal(true);
        setFormModal(<Address 
                        setShowModal={setShowModal} 
                        setReloadAddress={setReloadAddress}
                        newAddress={address ? false : true}
                        address={address || null} />)
        setTitleModal(title);
    }

    return (
        <div className="account_adresses">

            <div className="title">

                Direcciones
                <Icon name="plus" link onClick={() => newAdress("Nueva Dirección")} />
                
            </div>

            <div className="data">

                <ListAddress reloadAddress={reloadAddress} setReloadAddress={setReloadAddress} newAdress={newAdress} />

            </div>

            <BasicModal show={showModal} setShow={setShowModal} title={titleModal} >

                {formModal}

            </BasicModal>

        </div>
    )

}