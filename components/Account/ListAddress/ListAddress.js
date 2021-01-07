import React, { useState, useEffect } from 'react';
import { map, size } from 'lodash';
import { deleteAddressApi, getAddressApi } from '../../../api/address';
import useAuth from '../../../hooks/useAuth';
import { Button, Grid } from 'semantic-ui-react';
import { toast } from 'react-toastify';


export default function ListAddress(props) {

    const { reloadAddress, setReloadAddress, newAdress } = props;
    const [addresses, setAddresses] = useState(null);
    const { auth, logout } = useAuth();
    console.log(addresses);

    useEffect(() => {
        (async () => {

            const response = await getAddressApi(auth.idUser, logout);
            setAddresses(response || []);
            setReloadAddress(false);

        })();
    }, [reloadAddress])

    if( !addresses ) return null;

    return (
        <div className="list-address">
            { size(addresses) === 0 ? (

                <h3>Añade una nueva dirección</h3>

            ) : (
                <Grid>

                    { map( addresses, (address) => (

                        <Grid.Column key={address.id} mobile={16} tablet={8} computer={4}>

                            <AddressElement 
                            address={address} 
                            logout={logout} 
                            setReloadAddress={setReloadAddress} 
                            newAdress={newAdress} 
                             />

                        </Grid.Column>

                    ))}
                </Grid>
            ) }
        </div>
    )
}

// Modelo para las direcciones
function AddressElement(props) {

    const { address, logout, setReloadAddress, newAdress } = props;
    const [loadingDelete, setLoadingDelete] = useState(false);

    // funcion para eliminar una direccion
    const deleteAddress = async () => {

        setLoadingDelete(true);
        
        const response = await deleteAddressApi(address._id, logout);
        if( response ) {

            setReloadAddress(true);

        }
        
        setLoadingDelete(false);



    }

    return (
        <div className="address">

            <p>{address.title}</p>
            <p>{address.name}</p>
            <p>{address.address}</p>
            <p>{address.state}, {address.city} {address.postalCode}</p>
            <p>{address.phone}</p>

            <div className="actions">

                <Button primary onClick={() => newAdress(`Editar: ${address.title}`, address)}>Editar</Button>
                <Button onClick={deleteAddress} loading={loadingDelete}>Eliminar</Button>

            </div>

        </div>


    );

}