import { BASE_PATH } from '../utils/constants';

/*** FUNCION PARA OBTENER LOS 9 PRIMEROS JUEGOS ORDENADOS POR FECHA DE CREACIÓN ***/
export async function getLastGamesApi(limit) {

    try {
        
        const limitItems = `_limit=${limit}`;
        const sortItems = "_sort=createdAt:desc";
        const url = `${BASE_PATH}games?${limitItems}&${sortItems}`;

        const response = await fetch(url);
        const result = await response.json();

        return result;

    } catch (error) {
        
        return error;

    }

}
