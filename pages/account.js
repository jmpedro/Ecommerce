import React, { useState, useEffect } from 'react'
import BasicLayout from '../layouts/BasicLayout';
import { useRouter } from 'next/router';
import { getMeApi } from '../api/users';
import useAuth from '../hooks/useAuth';
import ChangeAccount from '../components/Account';

export default function Account() {

    // declaramos los props y los useState
    const [user, setUser] = useState(undefined);
    const router = useRouter();
    const { auth, logout } = useAuth();

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
            <Configuration user={user} logout={logout} />
        </BasicLayout>
    )
}

// Configuracion de la cuenta
function Configuration(props) {

    const { user, logout } = props;

    return (
        <div className="account_configuration">
            <div className="title">
                Configuración
            </div>
            <div className="data">
                <ChangeAccount user={user} logout={logout} />
            </div>
        </div>
    );

}