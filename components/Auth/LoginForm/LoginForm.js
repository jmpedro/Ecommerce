import React from 'react'

export default function LoginForm(props) {

    const { showRegisterForm } = props;

    return (
        <div>
            <h1>Contenido de inicio de sesion</h1>
            <button onClick={showRegisterForm} >Registrarse</button>
        </div>
    )
}
