import React, { useState } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { useFormik } from 'formik';
import * as yup from 'yup';
import useAuth from '../../../hooks/useAuth';
import { createAddressApi } from '../../../api/address';
import { toast } from 'react-toastify';

export default function Address(props) {

    const { setShowModal } = props;
    const [loading, setLoading] = useState(false);
    const { auth, logout } = useAuth()

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: yup.object(validationSchema()),
        onSubmit: (formData) => {

            createAddress(formData);

        }
    })

    const createAddress = async (formData) => {
        
        setLoading(true);
        const formDataTemp = {
            ...formData,
            user: auth.idUser
        };

        const response = await createAddressApi(formData, logout);
        if( !response ) {
            
            toast.warning("Error al crear la dirección, inténtelo de nuevo");
            setLoading(false);
        }else {

            formik.resetForm();
            setLoading(false);
            setShowModal(false);

        }

    }

    return (
        <Form onSubmit={formik.handleSubmit}>

            <Form.Input 
            name="title" 
            type="text" 
            label="Título de la dirección" 
            placeholder="Título de la dirección"
            onChange={formik.handleChange}
            value={formik.values.title}
            error={formik.errors.title} />

            <Form.Group widths="equal">

                <Form.Input 
                name="name" 
                type="text" 
                label="Nombre y apellidos" 
                placeholder="Nombre y apellidos"
                onChange={formik.handleChange}
                value={formik.values.name}
                error={formik.errors.name} />

                <Form.Input 
                name="address" 
                type="text" 
                label="Dirección" 
                placeholder="Dirección"
                onChange={formik.handleChange}
                value={formik.values.address}
                error={formik.errors.address} />

            </Form.Group>

            <Form.Group widths="equal">

                <Form.Input 
                name="city" 
                type="text" 
                label="Ciudad" 
                placeholder="Ciudad"
                onChange={formik.handleChange}
                value={formik.values.city}
                error={formik.errors.city} />

                <Form.Input 
                name="state" 
                type="text" 
                label="Estado/Provincia/Región" 
                placeholder="Estado/Provincia/Región"
                onChange={formik.handleChange}
                value={formik.values.state}
                error={formik.errors.state} />

            </Form.Group>

            <Form.Group widths="equal">

                <Form.Input 
                name="postalCode" 
                type="text" 
                label="Código postal" 
                placeholder="Código postal"
                onChange={formik.handleChange}
                value={formik.values.postalCode}
                error={formik.errors.postalCode} />

                <Form.Input 
                name="phone" 
                type="text" 
                label="Número de teléfono" 
                placeholder="Número de teléfono"
                onChange={formik.handleChange}
                value={formik.values.phone}
                error={formik.errors.phone} />

            </Form.Group>

            <div className="actions">
                <Button type="submit" className="submit" loading={loading}>Crear dirección</Button>
            </div>

        </Form>
    )
}

// Validación de datos
function initialValues() {
    return {
        title: "",
        name: "",
        address: "",
        city: "",
        state: "",
        postalCode: "",
        phone: ""
    }

}

function validationSchema() {
    return {
        title: yup.string().required(true),
        name: yup.string().required(true),
        address: yup.string().required(true),
        city: yup.string().required(true),
        state: yup.string().required(true),
        postalCode: yup.string().required(true),
        phone: yup.string().required(true)
    }
}
