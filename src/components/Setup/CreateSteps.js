import React from 'react';
import {  Step } from 'semantic-ui-react'


class CreateSteps extends React.Component {

    render(){
        return <div>
            create steps
            <Step.Group>
                <Step>
                <Step.Content>
                    <Step.Title>Create Team</Step.Title>
                    <Step.Description>Create a Team</Step.Description>
                </Step.Content>
                </Step>

                <Step >
                <Step.Content>
                    <Step.Title>Create Players</Step.Title>
                    <Step.Description>Create all the players for your new team</Step.Description>
                </Step.Content>
                </Step>

                <Step >
                <Step.Content>
                    <Step.Title>Create Games</Step.Title>
                </Step.Content>
                </Step>
            </Step.Group>

        </div>
    }

}

export default CreateSteps;