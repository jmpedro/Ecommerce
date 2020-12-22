import React, { useState } from 'react'
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

export default function Auth(props) {

    const { onShowModal, setTitleModal } = props;

    const [ login, setLogin ] = useState(true);

    const showLoginForm = () => {
        
        setTitleModal("Iniciar sesión");
        setLogin(true);

    };
    const showRegisterForm = () => {
        
        setTitleModal("Crea tu cuenta");
        setLogin(false);
        
    };

    return login ? (<LoginForm showRegisterForm={showRegisterForm} />) : 
    (<RegisterForm showLoginForm={showLoginForm} />);
}
