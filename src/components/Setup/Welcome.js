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
          <Header>Welcome to Stattr Dattr! </Header>
          <p>To get started, click on either Create Team or Join Team.</p>
          <p>To close, simply click the close button or click away</p>
        </Segment>
      </TransitionablePortal>
    )
  }
}

export default Welcome