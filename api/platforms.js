import { BASE_PATH } from '../utils/constants';

/*** FUNCION PARA OBTENER TODAS LAS PLATAFORMAS ***/
export async function getPlatformsApi() {

    try {
        
        //_sort=(campo que queramos):asc ==> le indicamos a la url que nos ordene los datos de forma ascendente por el campo que elijamos
        const url = `${BASE_PATH}platforms?_sort=position:asc`;
        const params = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        };

        const response = await fetch(url, params);
        const result = await response.json();

        return result;

    } catch (error) {
        
        return error;

    }

}
