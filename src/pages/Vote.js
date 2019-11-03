import React, {Component} from 'react';
import { Form, Button } from 'semantic-ui-react';

class Vote extends React.Component {

    state = {
        mom: '',
        dod: '',
        momComment: '',
        dodComment: ''
    }

    handleSubmit = (event) => {
        event.preventDefault()
        console.log('hello')
        console.log(this.state)
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