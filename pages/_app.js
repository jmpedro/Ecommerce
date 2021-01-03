import React, { useState, useEffect, useMemo } from 'react';
import { ToastContainer } from 'react-toastify';
import AuthContext from '../context/AuthContext';
import { setToken, getToken, deleteToken } from '../api/token';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/router';
import '../scss/global.scss';
import "semantic-ui-css/semantic.min.css";
import 'react-toastify/dist/ReactToastify.css';


export default function MyApp({ Component, pageProps }) {

  const [auth, setAuth] = useState(undefined);
  const [reloadUser, setReloadUser] = useState(false);
  const router = useRouter();

  // En el useEffect obtenemos el token del local storage para usarlo mas abajo en la funcion de authData
  useEffect(() => {

    // obtenemos el token del local storage
    const token = getToken();

    // si recibimos el token del usuario, seteamos el estado de la aplicacion con el token y su id de usuario
    if(token) {

      setAuth({
        token,
        idUser: jwtDecode(token).id
      });

    }else {
      setAuth(null);
    }

    setReloadUser(false);

  }, [reloadUser] )

  // En la siguiente función guardamos en el estado de la aplicacion los datos del usuario y en su local storage para que no desaparezcan
  const login = (token) => {

    setToken(token);

    setAuth({
      token,
      idUser: jwtDecode(token).id
    })

  };

  // En la siguiente funcion eliminamos el token del usuario generado para salir de sesion
  const logout = () => {

    if(auth) {

      deleteToken();
      setAuth(null);
      router.push("/");

    }

  }

  const authData = useMemo(
    () => ({
      auth,
      login,
      logout,
      setReloadUser
    }), [auth])
  
  if( auth === undefined ) return null;

  return (<AuthContext.Provider value={authData}>
  
    <Component {...pageProps} />

    <ToastContainer 
      position="top-right"
      autoClose={4000}
      hideProgressBar
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover />
  
  </AuthContext.Provider>)
}

