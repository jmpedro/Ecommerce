import { size } from 'lodash';
import { BASE_PATH } from '../utils/constants';
import { authFetch } from '../utils/fetch';

/*** FUNCION PARA COMPROBAR LOS FAVORITOS DE UN USUARIO  ***/
export async function isFavoriteApi(idUser, idGame, logout) {

    try {
        
        const url = `${BASE_PATH}favorites?user=${idUser}&game=${idGame}`;

        const result = await authFetch(url, null, logout);

        return result;

    } catch (error) {
        
        return error;

    }

}

/*** FUNCION PARA AÑADIR UN JUEGO A FAVORITOS  ***/
export async function addToFavoriteApi(idUser, idGame, logout) {

    try {
        
        const dataFound = await isFavoriteApi(idUser, idGame, logout);
        
        if( size(dataFound) > 0 || !dataFound ) {

            return null;

        }else {

            const url = `${BASE_PATH}favorites`;
            const params = {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ user: idUser, game: idGame})
            };

            const result = await authFetch(url, params, logout);

            return result;

        }

    } catch (error) {
        
        return error;

    }

}

/*** FUNCION PARA ELIMINAR UN JUEGO DE FAVORITOS  ***/
export async function deleteGameFromFavoriteApi(idUser, idGame, logout) {

    try {
        
        const dataFoundDelete = await isFavoriteApi(idUser, idGame, logout);

        if( size(dataFoundDelete) > 0 ) {

            const url = `${BASE_PATH}favorites/${dataFoundDelete[0]?._id}`;
            const params = {
                method: 'DELETE',
                headers: {
                    "Content-Type" : "application/json"
                }
            };

            const result = await authFetch(url, params, logout);

            return result;

        }

    } catch (error) {
        
        return error;

    }

}

/*** FUNCION PARA OBTENER LOS FAVORITOS DE UN USUARIO ***/
export async function getFavoritesApi(idUser, logout) {

    try {
        
        const url = `${BASE_PATH}favorites?user=${idUser}`;

        const result = await authFetch(url, null, logout);

        return result;

    } catch (error) {
        
        console.log(error);
        return null;

    }

}