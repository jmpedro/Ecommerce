import { BASE_PATH } from '../utils/constants';

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

        const response = await fetch(url, params);
        const result = await response.json();

        return result;

    } catch (error) {
        
        console.log(error);
        return null;

    }

}