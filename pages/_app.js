import React, { useState, useEffect, useMemo } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import AuthContext from '../context/AuthContext';
import { setToken, getToken, deleteToken } from '../api/token';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/router';
import '../scss/global.scss';
import "semantic-ui-css/semantic.min.css";
import 'react-toastify/dist/ReactToastify.css';
// Librerias para usar carousel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CartContext from '../context/CartContext';
import { getProductsCart, addProductsCart, countProductsCart, removeProductCart, removeAllProductsCart } from '../api/cart';


export default function MyApp({ Component, pageProps }) {

  const [auth, setAuth] = useState(undefined);
  const [reloadUser, setReloadUser] = useState(false);
  const [totalProductsCart, setTotalProductsCart] = useState(0);
  const [reloadCart, setReloadCart] = useState(false);
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
    }), [auth]);


  /* A PARTIR DE AQUÍ COMENZAMOS A PROGRAMAR LA LISTA DEL CARRITO */

  // Este useEffect se ejecutara cada vez que añadamos un juego al carrito
  useEffect(() => {
    
    setTotalProductsCart(countProductsCart());
    setReloadCart(false);

  }, [reloadCart, auth])

  // Funcion para añadir los productos
  const addProducts = product => {

    const token = getToken();
    if(token) {
      
      addProductsCart(product);
      setReloadCart(true);
      
    }else {

      toast.warning("Para comprar un juego debes iniciar sesión");

    }

  }

  // Funcion para eliminar un producto
  const removeProduct = product => {
    
    removeProductCart(product);
    setReloadCart(true);

  }

  const cartData = useMemo(
    () => ({
      productsCart: totalProductsCart,
      addProductsCart: addProducts,
      getProductsCart: getProductsCart,
      removeProductsCart: removeProduct,
      removeAllProductsCart: removeAllProductsCart
    }), [totalProductsCart]);
  
  if( auth === undefined ) return null;

  return (
    <AuthContext.Provider value={authData}>
    
      <CartContext.Provider value={cartData}>

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

      </CartContext.Provider>
    
    </AuthContext.Provider>)
}

