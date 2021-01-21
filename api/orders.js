import { result } from 'lodash';
import { BASE_PATH } from '../utils/constants';
import { authFetch } from '../utils/fetch';

/*** FUNCION PARA OBTENER TODOS LOS PEDIDOS DE UN USUARIO ***/
export async function getOrdersApi(idUser, logout) {

    try {
        
        const url = `${BASE_PATH}orders?user=${idUser}&_sort=createdAt:desc`;

        const result = await authFetch(url, null, logout);

        return result;

    } catch (error) {
        
        console.log(error);
        return null;

    }

}