import React from 'react';
import { Form, Button, Segment } from 'semantic-ui-react'; 
import API from '../adaptors/API'


class CommentForm extends React.Component {
    state = {
        comment: '',
        publicOrNot: true,
        game_id: this.props.game_id,
        user_id: this.props.currentUser.id
    }

    handleSubmit = (event) => {
        event.preventDefault()
        console.log(this.state)
        API.createComment(this.state)
          .then(data => {
            if (data.error) {
              throw Error(data.error)
            } else {
              console.log("data: ", data)
              this.props.pushGameUpdateToState()
            }
          })
          .catch(error => {
            alert(error)
          })
    }
    handleChange = event => this.setState({ [event.target.name]: event.target.value })


    handleCheckboxChange = () => this.setState({publicOrNot: !this.state.publicOrNot})

    render(){
        const { comment } = this.state
        const { handleChange, handleSubmit , handleCheckboxChange} = this
        return  <Segment>
          {console.log(this.props.game.notes)}
          {this.props.game.notes.filter(note=>note.public === true).map(note => 
          <Segment.Group>
            <Segment textAlign='left' size='large' key={note.id}> {note.comment} </Segment>
            <Segment secondary textAlign='right' size='small'></Segment>
            </Segment.Group>)} 
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
        <Form.Checkbox onChange={handleCheckboxChange} value={this.state.publicOrNot} name='publicOrNot' defaultChecked label='Make this public?' />
        {comment ? <Button > Enter Comment </Button> : <Button disabled> Enter Comment </Button>}

        </Form>
        </Segment>
    }

}

export default CommentForm;