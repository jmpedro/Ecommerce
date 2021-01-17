import { BASE_PATH } from '../utils/constants';
import { authFetch } from '../utils/fetch';

/*** FUNCION PARA OBTENER LOS FAVORITOS DE UN USUARIO  ***/
export async function isFavoriteApi(idUser, idGame, logout) {

    try {
        
        const url = `${BASE_PATH}favorites?user=${idUser}&game=${idGame}`;

        const result = await authFetch(url, null, logout);

        return result;

    } catch (error) {
        
        return error;

    }

}