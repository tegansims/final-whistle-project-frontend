import React from 'react';
import { Form, Button } from 'semantic-ui-react'; 
import API from '../adaptors/API'


class CommentForm extends React.Component {
    state = {
        comment: '',
        public: true,
        game_id: this.props.game_id,
        user_id: this.props.currentUser.id
    }

    handleSubmit = (event) => {
        event.preventDefault()
    
        API.createComment(this.state)
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
        <Form.Checkbox value={this.state.public} label='Make this public?' />
        <Button>Enter Comment</Button> 
        </Form>
    }

}

export default CommentForm;