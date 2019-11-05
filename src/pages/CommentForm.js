import React from 'react';
import { Form, Button, Segment } from 'semantic-ui-react'; 
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
              this.props.pushGameUpdateToState()
              this.props.handleClick()
              this.props.handleCommentClick() // not working ()
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
        return  <Segment>
          {this.props.game.notes.filter(note=>note.public === true).map(note => <li key={note.id}>{note.comment}</li>)} 
            <br></br>
          <Form onSubmit={handleSubmit}>
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
        </Segment>
    }

}

export default CommentForm;