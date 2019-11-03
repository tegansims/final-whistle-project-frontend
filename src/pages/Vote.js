import React, {Component} from 'react';
import { Form, Button } from 'semantic-ui-react';
import API from '../adaptors/API'

class Vote extends React.Component {

    state = {
        mom: '',
        dod: '',
        momComment: '',
        dodComment: '', 
        game_id: this.props.game_id,
        user_id: this.props.currentUser.id
    }

    handleSubmit = (event) => {
        event.preventDefault()
        API.createVote(this.state)
          .then(data => {
            if (data.error) {
              throw Error(data.error)
            } else {
              console.log("data: ", data)
            //   this.props.history.push('/games')   // CHANGE THIS URL TO WHATEVER YOU WANT TO REDIRECT TO WHEN SIGNED IN
            }
          })
          .catch(error => {
            alert(error)
          })
      }
    
    handleChange = event =>
        this.setState({ [event.target.name]: event.target.value })


    render(){
        const { mom, dod, momComment, dodComment } = this.state
        const { handleChange, handleSubmit } = this
        return <Form onSubmit={handleSubmit}>
            <input type='text'
                id='momInput'
                label='mom'
                value={mom}
                onChange={handleChange}
                name='mom'
                placeholder='Man of the Match'
            />
            <input type='text'
                id='momComment'
                label='momComment'
                value={momComment}
                onChange={handleChange}
                name='momComment'
                placeholder='Reasons'
            />
            <input 
                id='dodInput'
                label='dod'
                value={dod}
                onChange={handleChange}
                name='dod'
                type='text'
                placeholder='Dick of the Day'
            />
            <input 
                id='dodComment'
                label='dodComment'
                value={dodComment}
                onChange={handleChange}
                name='dodComment'
                type='text'
                placeholder='Reasons'
            />
        <Button> Submit </Button>
        </Form>
    }

}

export default Vote;