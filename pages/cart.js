import React, { useEffect, useState } from 'react'
import BasicLayout from '../layouts/BasicLayout';
import useCart from '../hooks/useCart';
import { getGameByUrlApi } from '../api/game';

export default function cart() {

    const { getProductsCart } = useCart();
    const products = getProductsCart();

    return !products ? <EmptyCart /> : <FullCart products={products}/>
}

function EmptyCart() {
    return (
        <BasicLayout className="empty-cart">
            <h2>No hay productos en el carrito</h2>
        </BasicLayout>
    );
}

function FullCart(props) {

    const { products } = props;
    const [productsData, setProductsData] = useState(null);
    console.log(productsData);

    useEffect(() => {
        (async () => {

            const productTemp = [];
            
            for await (const product of products) {
                
                const data = await getGameByUrlApi(product);
                productTemp.push(data);

            }

            setProductsData(productTemp);

        })();
    }, [])

    return (
        <BasicLayout className="full-cart">
            <h2>Carrito</h2>
        </BasicLayout>
    );
}


