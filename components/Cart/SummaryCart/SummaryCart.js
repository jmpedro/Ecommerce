import React, { useState, useEffect } from 'react';
import { map, forEach } from 'lodash';
import { Table, Icon, Image } from 'semantic-ui-react';
import useCart from '../../../hooks/useCart';

export default function SummaryCart(props) {

    const { products, reloadCart, setReloadCart } = props;
    const { removeProductsCart } = useCart();
    const [totalPrice, setTotalPrice] = useState(0);

    // En este useEffect calculamos el precio total de nuestro carrito y vamos a refrescar cada vez que la cantidad de productos cambien
    // o cada vez que eliminemos un producto de la lista
    useEffect(() => {
        
        let price = 0;
        
        forEach(products, (product) => {
            price += product.price;    
        });

        setTotalPrice(price);

    }, [reloadCart, products]);

    const removeProduct = product => {

        removeProductsCart(product);
        setReloadCart(true);

    }

    return (
        <div className="summary-cart">
            <div className="title">Resumen del carrito</div>

            <div className="data">
                
                <Table celled structured>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Producto</Table.HeaderCell>
                            <Table.HeaderCell>Plataforma</Table.HeaderCell>
                            <Table.HeaderCell>Entrega</Table.HeaderCell>
                            <Table.HeaderCell>Precio</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {map(products, (product) => (

                            <Table.Row key={product.id} className="summary-cart_product">
                                
                                <Table.Cell>
                                    <Icon name="close" link onClick={() => removeProduct(product.url) }/>
                                    <Image src={product.poster.url} alt={product.title} />
                                    {product.title}
                                </Table.Cell>
                                <Table.Cell>{product.platform.title}</Table.Cell>
                                <Table.Cell>Entrega en 24/48h</Table.Cell>
                                <Table.Cell>{product.price} €</Table.Cell>

                            </Table.Row>

                        ))}
                        <Table.Row className="summary-cart_resume">

                            <Table.Cell className="clear"></Table.Cell>
                            <Table.Cell colSpan="2">Total:</Table.Cell>
                            <Table.Cell className="total-price">
                                {totalPrice.toFixed(2)} €
                            </Table.Cell>

                        </Table.Row>
                    </Table.Body>
                </Table>

            </div>
        </div>
    )
}
