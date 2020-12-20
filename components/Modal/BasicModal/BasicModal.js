import { Modal, Icon,  } from 'semantic-ui-react';

export default function BasicModal(props) {
    
    const { show, setShow, children, title, ...rest } = props;

    // Funcion para cerrar el modal
    const onClose = () => setShow(false);

    return (
        <Modal className="basic-modal" open={show} onClose={onClose} {...rest} >
            
            {/* Cabecera */}
            <Modal.Header>

                <span>{title}</span>
                <Icon name="close" onClick={onClose} />

            </Modal.Header>

            {/* Contenido del modal */}
            <Modal.Content>

                {children}

            </Modal.Content>

        </Modal>
    )
}
