import React from 'react';
import {Form, Button, Segment} from 'semantic-ui-react'
import API from '../../adaptors/API' 
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Loading from '../Loading'


class CreateGame extends React.Component {

    state = {
        team_id: '',  
        opposition: '',
        venue: '', 
        date: new Date()
    }

    // componentDidMount(){
    //     this.setState({team_id: this.props.currentUser.team_id})
    // }

    handleChange = event =>
        this.setState({ [event.target.name]: event.target.value })

    handleDateChange = date => {
        this.setState({ date: date  });
    };   

    handleSubmit = (event) => {
        event.preventDefault()
        this.setState({team_id: this.props.currentUser.team_id}, () => 
        API.createGame({game: this.state}).then(data => {
            if (data.error) {
                throw Error(data.error)
            } else {
                console.log("data: ", data)
                this.props.history.push('/settings')
                this.props.pushGameUpdateToState()
            }
            })
            .catch(error => {
                alert(error)
            })
        )
    }

    render () {
        const { date, opposition, venue } = this.state
        const { handleChange, handleSubmit, handleDateChange } = this
        if (!this.props.currentUser) {
            return  <Loading/>
            
          } else {
        return (
            <Segment>
            <Form onSubmit={handleSubmit}>
            <DatePicker
                selected={date}
                onChange={handleDateChange}
                showTimeSelect
                dateFormat="dd/MM/yyyy, h:mm"
                value={date}
                name='date'
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
            </Segment>
        )}
    }

}

export default CreateGame;