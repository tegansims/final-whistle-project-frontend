import React from 'react';
import {Form, Button} from 'semantic-ui-react'
import API from '../../adaptors/API' 


class CreateGame extends React.Component {

    state = {
        team_id: 1,   // NEED TO NOT HARDCODE THIS
        date: '', 
        opposition: '',
        venue: ''
    }

    handleChange = event =>
        this.setState({ [event.target.name]: event.target.value })

    handleSubmit = (event) => {
        event.preventDefault()
        console.log(this.state)
        API.createGame({game: this.state}).then(data => {
            if (data.error) {
                throw Error(data.error)
            } else {
                console.log("data: ", data)
            }
            })
            .catch(error => {
                alert(error)
            })
    }

    render () {
        const { date, opposition, venue } = this.state
        const { handleChange, handleSubmit } = this
    
        return (
            <Form onSubmit={handleSubmit}>
            
            <input type='date'
                id='dateInput'
                label='Date'
                value={date}
                onChange={handleChange}
                name='date'
                placeholder='date'
            />
            <br />
                <input type='text'
                id='opposition'
                label='Opposition'
                value={opposition}
                onChange={handleChange}
                name='opposition'
                placeholder='opposition'
            />
            <br />
            <input type='text'
                id='venue'
                label='Venue'
                value={venue}
                onChange={handleChange}
                name='venue'
                placeholder='venue'
            />
            <br />
            <Button> Create Game </Button>
            </Form>
        )
    }

}

export default CreateGame;