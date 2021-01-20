import { includes, remove, size } from "lodash";
import { toast } from "react-toastify";
import { BASE_PATH, CART } from "../utils/constants";

/**** FUNCION PARA OBTENER LOS PRODUCTOS DEL CARRITO ****/
export function getProductsCart() {

    const cart = localStorage.getItem(CART);

    if(!cart) {

        return null;

    }else {

        const products = cart.split(",");

        return products;

    }

}

/**** FUNCION PARA AÑADIR UN PRODUCTO AL CARRITO ****/
export function addProductsCart(product) {

    const cart = getProductsCart();

    // Si no hay productos en el carrito, se añade
    if(!cart) {

        localStorage.setItem(CART, product);
        toast.success("¡Producto añadido al carrito!");

    }else {

        // Con includes buscamos un elemento en un array y nos devuele true o false
        const productFound = includes(cart, product);

        if(productFound) {
            
            toast.warning("Este producto ya está en el carrito");

        }else {

            cart.push(product);
            localStorage.setItem(CART, cart);
            toast.success("¡Producto añadido al carrito!");

        }

    }

}

/**** FUNCION PARA CONTAR LA CANTIDAD DE PRODUCTOS DEL CARRITO ****/
export function countProductsCart() {

    const cart = getProductsCart();

    if(!cart) {
        
        return 0;

    }else {

        return size(cart);

    }

}

/**** FUNCION PARA ELIMINAR UN PRODUCTO DEL CARRITO ****/
export function removeProductCart(product) {

    const cart = getProductsCart();

    // Cuando coincida el producto que hemos pasado por parámetro con la lista de todos ellos, se eliminará de la lista.
    remove(cart, (item) => {
        return item === product
    });

    // Si al borrar el producto, la lista es 0, se eliminará CART, ya que no hay nada, si no, actualizamos la lista sin el producto nuevo
    if( size(cart) > 0 ) {
        
        localStorage.setItem(CART, cart);

    }else {

        localStorage.removeItem(CART);

    }

}