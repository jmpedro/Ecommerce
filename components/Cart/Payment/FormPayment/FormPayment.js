import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import useAuth from '../../../../hooks/useAuth';
import useCart from '../../../../hooks/useCart';
import { Button } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { paymentCartApi } from '../../../../api/cart';
import { size } from 'lodash';

export default function FormPayment(props) {

    const { products, address } = props;
    const [loading, setLoading] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const { auth, logout } = useAuth();
    const { removeAllProductsCart } = useCart();
    const router = useRouter();

    // Funcion para hacer el acuerdo de cobro con stripe
    const handleSubmit = async (event) => {

        event.preventDefault();
        setLoading(true);

        // Comprobamos que stripe y elements sean diferentes de nulo
        if( !stripe || !elements ) return;

        // Obtenemos los datos de la tarjeta 
        const cardElement = elements.getElement(CardElement);
        // Los enviamos a stripe para hacer el acuerdo de cobro
        const result = await stripe.createToken(cardElement);

        if(result.error) {

            toast.error(result.error.message);

        }else {

            const response = await paymentCartApi(result.token, auth.idUser, products, address, logout);

            if( size(response) > 0 ) {
                
                toast.success("¡Pedido completado!");
                removeAllProductsCart();
                router.push("/")

            }else {
                toast.error("Error al realizar el pedido");
            }

        }

        setLoading(false);

    }

    return (
        <form className="form-payment" onSubmit={handleSubmit}>
            <CardElement />
            <Button type="submit" loading={loading} disabled={!stripe} >Pagar</Button>
        </form>
    )
}
