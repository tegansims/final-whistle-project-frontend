import React from 'react';
import {Form, Button, Segment} from 'semantic-ui-react'
import API from '../../adaptors/API' 
import Loading from '../Loading'


class CreatePlayer extends React.Component {

    state = {
        name: '', 
        team_id: ''
    }


    handleChange = event =>
        this.setState({ [event.target.name]: event.target.value })

    handleSubmit = (event) => {
        event.preventDefault()
        console.log(this.state)
        this.setState({team_id: this.props.currentUser.team_id}, () => 
        API.createPlayer({player: this.state}).then(data => {
            if (data.error) {
                throw Error(data.error)
            } else {
                console.log("data: ", data)
                this.props.history.push('/settings')
            }
            })
            .catch(error => {
                alert(error)
            })
        )
    }

    render () {
        const { name } = this.state
        const { handleChange, handleSubmit } = this
    
         if (!this.props.currentUser) {
            return  <Loading/>
            
          } else {
         return (  <Segment>
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
          </Segment>
        )
      }
    }
}

export default CreatePlayer;