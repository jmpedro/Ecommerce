import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { updateEmail } from '../../../api/users';
import { toast } from 'react-toastify';

export default function ChangeEmail(props) {

    const { user, logout, setReloadUser } = props;
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: yup.object(validationSchema()),
        onSubmit: async(formData) => {

            setLoading(true);

            const response = await updateEmail(user.id, formData.email, logout);

            if(!response || response.statusCode === 400) {

                toast.error("Error al actualizar el email");

            }else {

                setReloadUser(true);
                toast.success("¡Su perfil ha sido actualizado!");
                formik.handleReset();

            }

            setLoading(false);

        }
    })

    return (
        <div className="change-account">

            <h4>Cambia tu E-mail <span>(E-mail actual: {user.email} )</span></h4>

            <Form onSubmit={formik.handleSubmit}>

                <Form.Group widths="equal">

                    <Form.Input 
                    name="email" 
                    placeholder="Nuevo e-mail"
                    onChange={formik.handleChange}
                    error={formik.errors.email} />

                    <Form.Input 
                    name="repeatEmail" 
                    placeholder="Repite tu e-mail"
                    onChange={formik.handleChange}
                    error={formik.errors.repeatEmail} />

                </Form.Group>

                <Button type="submit" className="submit" loading={loading} >Actualizar</Button>

            </Form>
        </div>
    )
}

// Validacion de datos
function initialValues() {
    return {
        email: "",
        repeatEmail: ""
    }
}

function validationSchema() {
    return {
        email: yup.string().email(true).required(true),
        repeatEmail: yup.string().email(true).required(true).oneOf([yup.ref("email")], "Los Emails no coinciden")
    }
}
