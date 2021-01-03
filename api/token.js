import { TOKEN }from '../utils/constants';
import jwtDecode from 'jwt-decode';

/**** Lo que hacemos en la siguiente funcion es guardar el token en el local storage de la aplicacion
para que cuando recarguemos la pagina no desaparezcan los datos del usuario ****/
export function setToken (token) {

    localStorage.setItem(TOKEN, token);

}

/**** Obtenemos el token guardado en el local storage para poder usarlo en el estado de la aplicacion ****/
export function getToken() {

    return localStorage.getItem(TOKEN);

}

/**** Eliminamos el token generado para poder salir de la sesion ****/
export function deleteToken() {

    localStorage.removeItem(TOKEN);

}

/**** Comprobamos que el token del usuario no ha expirado para aplicar mas seguridad ****/
export function hasExpiredToken(token) {

    const tokenDecode = jwtDecode(token);
    // obtenemos la fecha de expiracion del token generado y lo multiplicamos por 1000 para que sea en milisegundos
    const expiredDate = tokenDecode.exp * 1000;
    // obtenemos la fecha actual y la comparamos con la del token
    const currentDate = new Date().getTime();

    if( currentDate > expiredDate ) {

        return true;

    }

    return false;

}