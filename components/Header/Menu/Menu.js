import { useState } from 'react';
import { Container, Menu as MenuWeb, Label, Grid, Icon } from 'semantic-ui-react';
import Link from 'next/link';
import BasicModal from '../../Modal/BasicModal';

export default function Menu() {

    const [showModal, setShowModal] = useState(false)

    const onShowModal = () => setShowModal(true);

    return (
        <div className="menu">
            <Container>
                <Grid>

                    <Grid.Column className="menu_left" width={6} >

                        <Multiplatforms/>

                    </Grid.Column>
                    <Grid.Column className="menu_right" width={10} >

                        <Options onShowModal= {onShowModal} />

                    </Grid.Column>
                </Grid>
            </Container>

            <BasicModal show={showModal} setShow={setShowModal} title={"Inicia sesión"} size="small" >
                <h2>Contenido del modal</h2>
            </BasicModal>
        </div>
    )
}

// Plataformas
function Multiplatforms() {

    return (
        <MenuWeb>
            <Link href="/play-station">
                <MenuWeb.Item as="a">Playstation</MenuWeb.Item>
            </Link>

            <Link href="/xbox">
                <MenuWeb.Item as="a">Xbox</MenuWeb.Item>
            </Link>

            <Link href="/switch">
                <MenuWeb.Item as="a">Switch</MenuWeb.Item>
            </Link>
        </MenuWeb>
    );
}

// Menu de opciones
function Options(props) {

    const { onShowModal } = props;

    return (
        <MenuWeb>
            <MenuWeb.Item onClick={onShowModal}>
                <Icon name="user outline" />
                Mi cuenta
            </MenuWeb.Item>
        </MenuWeb>
    );

}
