import { BASE_PATH } from '../utils/constants';
import { authFetch } from '../utils/fetch';

/**** REGISTRAR UN USUARIO ****/
export async function registerUser(formData) {

    try {

        const url = `${BASE_PATH}auth/local/register`;
        const params = {
            method: 'POST',
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(formData)
        };

        const response = await fetch(url, params);
        const result = await response.json();

        return result;

    } catch (error) {

        console.log(error);
        return null;

    }
    
}

/**** LOGIN CON USUARIO ****/
export async function loginUser(formData){

    try {
        
        const url = `${BASE_PATH}auth/local`;
        const params = {
            method: 'POST',
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(formData)
        };

        // hacemos el fetch
        const response = await fetch(url, params);

        // pasamos el resultado a formato JSON
        const result = await response.json();

        return result;

    } catch (error) {
        
        console.log(error);
        return null;

    }

}

/**** RESETEAR PASSWORD ****/
export async function resetPasswordUser(email) {
    try {
        
        const url = `${BASE_PATH}auth/forgot-password`;

        const params = {
            method: 'POST',
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({email})
        };

        // hacemos el fetch
        const response = await fetch(url, params);

        // pasamos el resultado a formato JSON
        const result = await response.json();

        return result;

    } catch (error) {
        console.log(error);
        return null;
    }
}

/**** TRAER LOS DATOS DEL USUARIO LOGGEADO ****/
export async function getMeApi(logout) {

    try {
        
        const url = `${BASE_PATH}users/me`;
        // hacemos la llamada a authFetch para que haga la peticion al servidor
        const result = await authFetch(url, null, logout);
        
        // si viene el resultado, lo devolvemos, y si no devolvemos un nulo
        return result ? result : null;

    } catch (error) {
        
        return error;

    }

}

/**** ACTUALIZAR LOS DATOS DEL USUARIO LOGEADO ****/
export async function updateAccount(idUser, data, logout) {

    try {
        
        const url = `${BASE_PATH}users/${idUser}`;

        const params = {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        };

        const result = await authFetch(url, params, logout);

        return result ? result : null;


    } catch (error) {
        return error;
    }

}