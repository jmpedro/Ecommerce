import { useState, useEffect } from 'react';

export default function useWindowSize() {

    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined
    });

    // La funcion del useEffect se encarga de detectar el ancho y el alto de la pantalla
    useEffect(() => {
        
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        }

        // Creamos un evento para que se ejecute cada vez que el tamaño de la pantalla cambie
        window.addEventListener("resize", handleResize);

        handleResize();

        // Devolvemos el resultado del renderizado del tamaño
        return () => window.removeEventListener("resize", handleResize);

    }, []);

    return windowSize;

}