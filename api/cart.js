import { includes, size } from "lodash";
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