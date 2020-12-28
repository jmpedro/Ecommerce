import React, { useState, useMemo } from 'react';
import { ToastContainer } from 'react-toastify';
import AuthContext from '../context/AuthContext';
import { setToken } from '../api/token';
import jwtDecode from 'jwt-decode';
import '../scss/global.scss';
import "semantic-ui-css/semantic.min.css";
import 'react-toastify/dist/ReactToastify.css';

export default function MyApp({ Component, pageProps }) {

  const [auth, setAuth] = useState(undefined);
  console.log(auth);

  // En la siguiente función guardamos en el estado de la aplicacion los datos del usuario y en su local storage para que no desaparezcan
  const login = token => {

    setToken(token);

    setAuth({
      token,
      idUser: jwtDecode(token).id
    })

  };

  const authData = useMemo(
    () => ({
      auth,
      login,
      logout: () => null,
      setReloadUser: () => null
    }), [])

  return <AuthContext.Provider value={authData}>
  
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
  
  </AuthContext.Provider>
}

