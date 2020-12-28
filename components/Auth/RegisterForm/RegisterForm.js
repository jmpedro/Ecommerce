import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {registerUser} from '../../../api/users';
import { toast } from 'react-toastify';

export default function RegisterForm(props) {

    const { showLoginForm } = props;
    const [loading, setLoading] = useState(false);

    // para coger los datos del formulario tenemos que usar el hook de formik
    const formik = useFormik({
        
        initialValues: initialValues(),
        validationSchema: yup.object(validationSchema()),
        onSubmit: async (formData) => {

            setLoading(true);

            const response = await registerUser(formData);

            if(response?.jwt) {
                
                toast.success("¡Registro completado!");
                showLoginForm()
            
            }else {

                toast.error("Error al registrar el usuario, inténtelo de nuevo");

            }

            setLoading(false)
        }
        
    }); 

    return (
        <Form className="formulario" onSubmit={formik.handleSubmit} >
            <Form.Input type="text" name="name" placeholder="Nombre" onChange={formik.handleChange} error={formik.errors.name} />
            <Form.Input type="text" name="lastname" placeholder="Apellidos" onChange={formik.handleChange} error={formik.errors.lastname} />
            <Form.Input type="text" name="username" placeholder="Nombre de usuario" onChange={formik.handleChange} error={formik.errors.username} />
            <Form.Input type="text" name="email" placeholder="Correo electrónico" onChange={formik.handleChange} error={formik.errors.email} />
            <Form.Input type="password" name="password" placeholder="Contraseña" onChange={formik.handleChange} error={formik.errors.password} />

            <div className="actions">
                <Button type="button" basic onClick={showLoginForm} >Iniciar sesión</Button>
                <Button type="submit" className="submit" loading={loading}>Registrar</Button>
            </div>
        </Form>
    )
}

function initialValues() {
    return {
        name: "",
        lastname: "",
        username: "",
        email: "",
        password: ""
    }
}

// Validación de los datos del formulario
function validationSchema() {
    return {
        name: yup.string().required(true),
        lastname: yup.string().required(true),
        username: yup.string().required(true),
        email: yup.string().email(true).required(true),
        password: yup.string().required(true)
    }
}
