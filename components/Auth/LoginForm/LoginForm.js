import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { loginUser, resetPasswordUser } from '../../../api/users';
import useAuth from '../../../hooks/useAuth';

export default function LoginForm(props) {

    // Declaramos las props recibidas y los useStates
    const { showRegisterForm, closeModal } = props;
    const [loading, setLoading] = useState(false);

    // Instanciamos el contexto useAuth y obtenemos sus datos con object destructuring
    const { auth, login } = useAuth();    

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: yup.object(validationSchema()),
        onSubmit: async (formData) => {

            setLoading(true);

            const response = await loginUser(formData);

            if( response?.jwt ) {
                
                // Le pasamos a la funcion de login el json web token
                login(response.jwt);
                closeModal();
               
            }else {

                toast.error("El email o la contraseña no son correctos");

            }

            setLoading(false)

        }
    });

    // Funcion para resetear el password
    const resetPassword = () => {

        // Inicializamos todos los errores a vacio
        formik.setErrors({});

        // Cogemos el valor del correo para hacer la validacion
        const validateEmail = yup.string().email().required();

        // Hacemos la validación para comprobar si existe ese correo
        if( !validateEmail.isValidSync(formik.values.identifier) ) {
            formik.setErrors({ identifier: true });
        }else {
            resetPasswordUser(formik.values.identifier);
        }

    }

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
                    <Button type="button" onClick={resetPassword}>¿Has olvidado la contraseña?</Button>
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