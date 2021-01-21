import React, { useState, useEffect } from 'react';
import BasicLayout from '../layouts/BasicLayout';
import useAuth from '../hooks/useAuth';
import { getOrdersApi } from '../api/orders';
import { map, size } from 'lodash';
import { Grid, Loader } from 'semantic-ui-react';
import Order from '../components/Orders/Order/Order';
import Seo from '../components/Seo';

export default function Orders() {

    const [orders, setOrders] = useState(null);
    const { auth, logout } = useAuth();
    console.log(orders);

    // Traemos todos los pedidos del usuario
    useEffect(() => {
        (async () => {

            if( auth ) {

                const response = await getOrdersApi(auth.idUser, logout);
                setOrders(response || []);

            }

        } )();
    }, [auth]);

    if(orders === null) return <Loader active>Cargando artículos</Loader>;

    return (
        <BasicLayout className="orders">

            <Seo title="Mis pedidos" />

            <div className="orders_block">

                <div className="title">
                    Mis pedidos
                </div>

                <div className="data">
                    {size(orders) === 0 ? (
                        <h2 style={{ textAlign: "center" }}>No has realizado ninguna compra todavia</h2>
                    ) : 
                        <OrderList orders={orders} />
                    }
                </div>

            </div>
            
        </BasicLayout>
    )
}

function OrderList(props) {

    const { orders } = props;

    return (
        <Grid>
            {map(orders, (order) => (
                <Grid.Column mobile="16" tablet="8" computer="8" key={order.id} >
                    <Order order={order}  />
                </Grid.Column>
            ))}
        </Grid>
    )

}