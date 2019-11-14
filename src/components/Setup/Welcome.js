import React, { Component } from 'react'
import {
  Button,
  Header,
  Segment,
  TransitionablePortal,
} from 'semantic-ui-react'

class Welcome extends Component {
  state = { open: false }

  handleOpen = () => this.setState({ open: true })

  handleClose = () => this.setState({ open: false })

  render() {
    const { open } = this.state

    return (
      <TransitionablePortal
        closeOnTriggerClick
        onOpen={this.handleOpen}
        onClose={this.handleClose}
        openOnTriggerClick
        trigger={
          <Button
            content={open ? 'Close' : 'Welcome'}
            negative={open}
            positive={!open}
          />
        }
      >
        <Segment
          style={{   zIndex: 1000 }}
        >
          <Header>Welcome to Final Whistle! </Header>
          <p>To get started, click on either Create Team or Join Team.</p>
          <p><span style={{color: '#B01943'}}>Warning!</span> You can only be a member of one team, 
            so if you are already part of a team and you create a new one, you will lose access to your old team's data.</p>
        </Segment>
      </TransitionablePortal>
    )
  }
}

export default Welcome