import React, { useState } from 'react'
import { Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { updateAccount } from '../../api/users';

export default function ChangeAccount(props) {

    const { user, logout } = props;
    const [loading, setLoading] = useState(false)

    const formik = useFormik({
        initialValues: initialValues(user.name, user.lastname),
        validationSchema: yup.object(validationSchema()),
        onSubmit: async(formData) => {
            
            setLoading(true);

            const response = await updateAccount(user.id, formData, logout );
            if(!response) {

                toast.error("La actualización no se ha podido completar");

            }else {

                toast.success("¡Su perfil ha sido actualizado!");

            }

            setLoading(false);
            
        }
    });

    return (
        <div className="change-account">
            <h4>Cambia tu nombre y apellidos</h4>

            <Form onSubmit={formik.handleSubmit}>
                <Form.Group widths="equal">

                    <Form.Input 
                        name="name" 
                        placeholder="Nuevo nombre"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        error={formik.errors.name} />
                    <Form.Input 
                        name="lastname"
                        placeholder="Nuevo apellido"
                        onChange={formik.handleChange}
                        value={formik.values.lastname}
                        error={formik.errors.lastname} />

                </Form.Group>

                <Button type="submit" className="submit" loading={loading}>Actualizar</Button>
            </Form>
        </div>
    )
}

// Validacion de los datos
function initialValues(name, lastname) {
    
    return {
        name: name || "",
        lastname: lastname || ""
    }

}

function validationSchema() {

    return {
        name: yup.string().required(true),
        lastname: yup.string().required(true)
    }

}
