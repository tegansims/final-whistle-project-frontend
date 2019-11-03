import React from 'react';
import { Form, Button } from 'semantic-ui-react'; 

class CommentForm extends React.Component {
    state = {
        comment: ''
    }

    handleSubmit = (event) => {
        event.preventDefault()
        console.log(this.state)
    }
    handleChange = event =>
        this.setState({ [event.target.name]: event.target.value })

    render(){
        const { comment } = this.state
        const { handleChange, handleSubmit } = this
        return  <Form onSubmit={handleSubmit}>
            <input type='text'
                id='comment'
                label='comment'
                value={comment}
                onChange={handleChange}
                name='comment'
                placeholder='comment'
            />
        <Button>Enter Comment</Button> 
        </Form>
    }

}

export default CommentForm;