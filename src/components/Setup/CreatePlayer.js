import React from 'react';
import {Form, Button} from 'semantic-ui-react'
import API from '../../adaptors/API' 


class CreatePlayer extends React.Component {

    state = {
        name: '', 
        team_id: 1   // NEED TO NOT HARDCODE THIS
    }

    handleChange = event =>
        this.setState({ [event.target.name]: event.target.value })

    handleSubmit = (event) => {
        event.preventDefault()
        console.log(this.state)
        API.createPlayer({player: this.state}).then(data => {
            if (data.error) {
                throw Error(data.error)
            } else {
                console.log("data: ", data)
            }
            })
            .catch(error => {
            console.error(error)
            })
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