import React, { useState } from 'react'
import Link from 'next/link';
import { Icon, Image } from 'semantic-ui-react';
import moment from 'moment';
import BasicModal from '../../Modal/BasicModal';

export default function Order(props) {

    const { order } = props;
    const { game, totalPayment, addressShipping, createdAt } = order;
    const { title, poster, url } = game;
    const [showModal , setShowModal] = useState(false);

    return (
        <>
            <div className="order">

                <div className="order_info">
                    
                    <div className="order_info-data">
                        
                        <Link href={`/${url}`}>
                            <a>
                                <Image src={poster.url} alt={title} />
                            </a>
                        </Link>
                        
                        <div>

                            <h2>{title}</h2>
                            <p>{totalPayment} €</p>

                        </div>

                    </div>
                    
                    <div className="order_other">

                        <p className="order_other-date">
                            {moment(createdAt).format("L")}
                        </p>           

                        <Icon name="eye" circular link onClick={() => setShowModal(true)} /> 

                    </div>
                
                </div>

            </div>

            <AddressModal showModal={showModal} setShowModal={setShowModal} title={title} addressShipping={addressShipping} />
            
        </>
    )
}

function AddressModal(props) {

    const { showModal, setShowModal, title, addressShipping } = props;

    return(
        <BasicModal show={showModal} setShow={setShowModal} title={title} size="tiny">

            <h3>El pedido ha sido enviado a la siguiente dirección:</h3>

            <div>
                
                <p>{addressShipping.name}</p>
                <p>{addressShipping.address}</p>
                <p>{addressShipping.state}, {addressShipping.city} {addressShipping.postalCode} </p>
                <p>{addressShipping.phone}</p>

            </div>

        </BasicModal>
    );

}
