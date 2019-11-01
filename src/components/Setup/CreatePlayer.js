import React, {Component} from 'react';
import {Form, Button} from 'semantic-ui-react'

class CreatePlayer extends React.Component {

    state = {
        name: ''
    }

    render () {
        const { name } = this.state
        const { handleChange, handleSubmit } = this
    
        return (
           <Form onSubmit={handleSubmit}>
         
           <input type='text'
              id='nameInput'
              label='Name'
              value={name}
              onChange={handleChange}
              name='name'
              placeholder='name'
            />
            <br />
            <Button> Create Player </Button>
          </Form>
        )
      }

}

export default CreatePlayer;