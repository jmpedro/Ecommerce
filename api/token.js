import { TOKEN }from '../utils/constants';

/**** Lo que hacemos en la siguiente funcion es guardar el token en el local storage de la aplicacion
para que cuando recarguemos la pagina no desaparezcan los datos del usuario ****/
export function setToken (token) {

    localStorage.setItem(TOKEN, token);

}