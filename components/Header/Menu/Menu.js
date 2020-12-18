import { Container, Menu as MenuWeb, Label, Grid, Icon } from 'semantic-ui-react';
import Link from 'next/link';

export default function Menu() {
    return (
        <div className="menu">
            <Container>
                <Grid>

                    <Grid.Column className="menu_left" width={6} >

                        <Multiplatforms/>

                    </Grid.Column>
                    <Grid.Column className="menu_right" width={10} >

                        <Options />

                    </Grid.Column>
                </Grid>
            </Container>
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
function Options() {

    return (
        <MenuWeb>
            <MenuWeb.Item>
                <Icon name="user outline" />
                Mi cuenta
            </MenuWeb.Item>
        </MenuWeb>
    );

}
