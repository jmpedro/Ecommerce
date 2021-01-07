import { BASE_PATH } from '../utils/constants';
import { authFetch } from '../utils/fetch';

/*** FUNCION PARA CREAR UNA NUEVA DIRECCION ***/
export async function createAddressApi(address, logout) {

    try {
        
        const url = `${BASE_PATH}addresses`;

        const params = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(address)
        };

        const result = await authFetch(url, params, logout);
 
        return result;

    } catch (error) {
        
        return error;

    }

}

/*** FUNCION PARA OBTENER TODAS LAS DIRECCIONES DE UN USUARIO ***/
export async function getAddressApi(idUser, logout) {

    try {
        
        const url = `${BASE_PATH}addresses?user=${idUser}`;

        const result = await authFetch(url, null, logout);

        if( result.statusCode === 500 ) throw "Error en el servidor";

        return result;

    } catch (error) {
                
        return error;

    }

}

/*** FUNCION PARA ELIMINAR LA DIRECCION DE UN USUARIO ***/
export async function deleteAddressApi(idAddress, logout) {

    try {
        
        const url = `${BASE_PATH}addresses/${idAddress}`;

        const params = {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            }
        };

        const result = await authFetch(url, params, logout);

        if( result.statusCode === 500 ) throw "Error del servidor";

        return true;

    } catch (error) {
        
        return error;

    }

}

/*** FUNCION PARA ACTUALIZAR LA DIRECCION DE UN USUARIO ***/
export async function updateAddressApi(idAddress, addressData, logout) {

    try {
        
        const url = `${BASE_PATH}addresses/${idAddress}`;

        const params = {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(addressData)
        };

        const result = await authFetch(url, params, logout);
        
        return result;

    } catch (error) {
        
        return error;

    }

}