import { BASE_PATH } from '../utils/constants';

/*** FUNCION PARA OBTENER LOS X PRIMEROS JUEGOS ORDENADOS POR FECHA DE CREACIÓN ***/
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

/*** FUNCION PARA OBTENER LOS JUEGOS EN FUNCION DE LA PLATAFORMA  ***/
export async function getGamesFromPlatformApi(platform, limit, start) {

    try {
        
        const limitItems = `_limit=${limit}`;
        const startItems = `_start=${start}`;// _start=(number) sirve para hacer la paginacion
        const sortItems = "_sort=createdAt:desc";
        const url = `${BASE_PATH}games?platform.url=${platform}&${limitItems}&${sortItems}&${startItems}`;

        const response = await fetch(url);
        const result = await response.json();
        console.log("platform:", platform);
        console.log("Limit:", limit);
        console.log("Start:", start)
        console.log(result);
        
        return result;

    } catch (error) {
        console.log(error);
        return null;

    }
}

/*** FUNCION PARA OBTENER TODOS LOS JUEGOS DE UNA PLATAFORMA ***/
export async function getTotalGamesFromPlatformApi(platform) {

    try {
        
        const url = `${BASE_PATH}games/count?platform.url=${platform}`;
        const response = await fetch(url);
        const result = await response.json();

        return result;

    } catch (error) {

        console.log(error);
        return null;

    }

}