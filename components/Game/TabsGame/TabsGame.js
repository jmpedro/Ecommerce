import React from 'react'
import { Tab } from 'semantic-ui-react'
import InfoGame from '../InfoGame/InfoGame';

export default function TabsGame(props) {

    const { game } = props;

    const panes = [
        {
            menuItem: "Gameplay",
            render: () => (
                <Tab.Pane>
                    <InfoGame game={game} />
                </Tab.Pane>
            )
        },
        {
            menuItem: "Comentarios",
            render: () => (
                <Tab.Pane>
                    <h1>Lista de comentarios</h1>
                </Tab.Pane>
            )
        }
    ]

    return  <Tab className="tabs-game" panes={panes} />
}
