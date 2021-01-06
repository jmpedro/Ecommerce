import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { updatePassword } from '../../../api/users';
import { toast } from 'react-toastify';

export default function ChangePassword(props) {

    const { user, logout} = props;
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: yup.object(validationSchema()),
        onSubmit: async(formData) => {

            setLoading(true);

            const response = await updatePassword(user.id, formData.password, logout);

            if(!response) {

                toast.error("Error al actualizar la contraseña");

            }else {

                toast.success("¡Su perfil ha sido actualizado!");
                logout();

            }

            setLoading(false);

        }
    })

    return (
        <div className="change-account">

            <h4>Cambia tu contraseña</h4>

            <Form onSubmit={formik.handleSubmit}>

                <Form.Group widths="equal">

                    <Form.Input 
                    name="password" 
                    type="password"
                    placeholder="Nueva contraseña"
                    onChange={formik.handleChange}
                    error={formik.errors.password} />

                    <Form.Input 
                    name="repeatPassword" 
                    type="password"
                    placeholder="Repite tu contraseña"
                    onChange={formik.handleChange}
                    error={formik.errors.repeatPassword} />

                </Form.Group>

                <Button type="submit" className="submit" loading={loading} >Actualizar</Button>

            </Form>
        </div>
    )
}

// Validacion de datos
function initialValues() {
    return {
        password: "",
        repeatPassword: ""
    }
}

function validationSchema() {
    return {
        password: yup.string().required(true),
        repeatPassword: yup.string().required(true).oneOf([yup.ref("password")], "La contraseña no coincide")
    }
}