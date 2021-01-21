import React, { useEffect, useState } from 'react'
import BasicLayout from '../layouts/BasicLayout';
import { Loader } from 'semantic-ui-react';
import useCart from '../hooks/useCart';
import { getGameByUrlApi } from '../api/game';
import SummaryCart from '../components/Cart/SummaryCart/SummaryCart';
import AddressShipping from '../components/Cart/AddressShipping/AddressShipping';
import Payment from '../components/Cart/Payment';
import Seo from '../components/Seo';

export default function cart() {

    const { getProductsCart } = useCart();
    const products = getProductsCart();

    return !products ? <EmptyCart /> : <FullCart products={products}/>
}

function EmptyCart() {
    return (
        <BasicLayout className="empty-cart">
            <Seo title="Carrito" />
            <h2>No hay productos en el carrito</h2>
        </BasicLayout>
    );
}

function FullCart(props) {

    const { products } = props;
    const [productsData, setProductsData] = useState(null);
    const [reloadCart, setReloadCart] = useState(false);
    const [address, setAddress] = useState(null);
    
    useEffect(() => {
        (async () => {

            const productTemp = [];
            
            for await (const product of products) {
                
                const data = await getGameByUrlApi(product);
                productTemp.push(data);

            }

            setProductsData(productTemp);
            setReloadCart(false);

        })();
    }, [reloadCart])

    return (
        <BasicLayout className="empty-cart">
            <Seo title="Carrito" />
            {!productsData ? <Loader active>Cargando carrito</Loader> : <SummaryCart products={productsData} reloadCart={reloadCart} setReloadCart={setReloadCart} />}
            {productsData && <AddressShipping setAddress={setAddress}/>}

            { address && <Payment address={address} products={productsData} />}
        </BasicLayout>
    );
}


