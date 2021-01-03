import React from 'react'
import { Container } from 'semantic-ui-react'
import classNames from 'classnames';
import Header from '../../components/Header'

export default function BasicLayout(props) {

    const { children, className } = props;

    /*  Para poder añadir a nuestra clase otras diferentes, debemos usar classNames, donde le indicamos en primer lugar 
        que clase va a ser la principal, y despues las que les vamos a añadir.  */
    return (
        <Container fluid className={classNames("basic-layout", {
            // Al poner [className], le indicamos que queremos obtener su contenido 
            [className]: className
        })}>

            <Header />

            <Container className="content">

                {children}

            </Container>
            
        </Container>
    )
}
