
import React from 'react';
import {  Message, Icon, Menu , Link} from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';


const link = {
  background: '#B01943', 
  color: 'white'
} 

class Loading extends React.Component {

    render() {
      return <div>
      {/* <Menu>
      <Menu.Item as={NavLink} to='/login' exact style={link}>Login</Menu.Item>
    </Menu> */}
      <Message icon>
          <Icon name='circle notched' loading />
          <Message.Content>
            <Message.Header>Stattr Dattr</Message.Header>
            Content coming soon...
          </Message.Content>
      </Message>
      </div>
      }
    }

  export default Loading