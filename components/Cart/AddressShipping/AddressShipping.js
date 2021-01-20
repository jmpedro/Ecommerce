import { map, size } from 'lodash';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Grid } from 'semantic-ui-react';
import classNames from 'classnames';
import { getAddressApi } from '../../../api/address';
import useAuth from '../../../hooks/useAuth';


export default function AddressShipping(props) {

    const { setAddress } = props;
    const { auth, logout } = useAuth();
    const [addresses, setAddresses] = useState(null);
    const [addressActive, setAddressActive] = useState(null);

    // Obtenemos las direcciones del usuario 
    useEffect(() => {
        (async () => {
            
            if(auth) {

                const response = await getAddressApi(auth.idUser, logout);
                setAddresses(response || []);

            }

        })();
    }, [auth, addresses]);

    if( addresses === null ) return null;

    return (
        <div className="addresses-shipping">
            <div className="title">Dirección de envío</div>
            <div className="data">
                { size(addresses) === 0 ? (
                    <h3>
                        No hay ninguna dirección creada. <br></br>
                    
                        <Link href="/account">
                            <a>Añadir dirección</a>
                        </Link>
                    
                    </h3>
                    
                ) : (
                    <Grid>
                        {map(addresses, (address) => (
                            <Grid.Column key={address.id} mobile="16" tablet="8" computer="4">
                                
                                <Address address={address} setAddress={setAddress} addressActive={addressActive} setAddressActive={setAddressActive} />

                            </Grid.Column>
                        ))}
                    </Grid>
                ) }
            </div>
        </div>
    )
}

function Address(props) {

    const { address, setAddress, addressActive, setAddressActive } = props;

    const changeAddress = () => {

        // Obtenemos la direccion seleccionada con su id
        setAddressActive(address._id);
        setAddress(address);

    };

    return (
        <div className={classNames("address", {
            active: addressActive === address._id
        })} onClick={changeAddress}>

            <p>{address.title}</p>
            <p>{address.name}</p>
            <p>{address.address}</p>
            <p>
                {address.city}, {address.state} {address.postalCode} 
            </p>
            <p>{address.phone}</p>

        </div>
    );

}
