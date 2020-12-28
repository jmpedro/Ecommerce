import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { loginUser } from '../../../api/users';
import useAuth from '../../../hooks/useAuth';

export default function LoginForm(props) {

    // Declaramos las props recibidas y los useStates
    const { showRegisterForm, closeModal } = props;
    const [loading, setLoading] = useState(false);

    // Instanciamos la clase auth y obtenemos sus datos con object destructuring
    const { login } = useAuth();

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: yup.object(validationSchema()),
        onSubmit: async (formData) => {

            setLoading(true);

            const response = await loginUser(formData);

            if( !response?.jwt ) {
                
                toast.error("El email o la contraseña no son correctos");

            }else {

                // Le pasamos a la funcion de login el json web token
                login(response.jwt);
                closeModal();

            }

            setLoading(false)

        }
    })

    return (
        <Form className="formulario" onSubmit={formik.handleSubmit}>
            
            <Form.Input 
            type="text" 
            name="identifier" 
            placeholder="Correo electrónico" 
            onChange={formik.handleChange}
            error={formik.errors.identifier} />

            <Form.Input 
            type="password" 
            name="password" 
            placeholder="Contraseña"
            onChange={formik.handleChange}
            error={formik.errors.password} />

            <div className="actions">

                <Button type="button" basic onClick={showRegisterForm}>Registrarse</Button>
                
                <div>
                    <Button className="submit" type="submit" loading={loading} >Entrar</Button>
                    <Button type="button">¿Has olvidado la contraseña?</Button>
                </div>

            </div>

        </Form>
    )
}

// Validacion de los campos
function initialValues() {
    return {
        identifier: "",
        password: ""
    }
}

function validationSchema() {
    return {
        identifier: yup.string().email(true).required(true),
        password: yup.string().required(true)
    }
}