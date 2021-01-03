import { getToken, hasExpiredToken } from '../api/token';

/* Creamos una funcion donde comprobaremos que el usuario este loggeado o no cuando haga una petición al servidor,
   y que el tiempo de expiracion de su token haya caducado o no.  */

export async function authFetch(url, params, logout) {

    // obtenemos el token
    const token = getToken();

    // comprobamos si el usuario esta loggeado
    if( !token ) {

        logout();

    }else {

        // si esta loggeado, comprobamos que el token no haya pasado la fecha de expiracion
        if( hasExpiredToken(token) ) {

            logout();

        }else {

            // hacemos el fetch al servidor añadiendole los parametros necesarios para que funcione
            const paramsTemps = {
                ...params,
                headers: {
                    ...params?.headers,
                    Authorization: `Bearer ${token}`
                }
            };

            try {
                
                const response = await fetch(url, paramsTemps);
                const result = await response.json();

                return result;

            } catch (error) {
                
                return error;

            }

        }

    }

}