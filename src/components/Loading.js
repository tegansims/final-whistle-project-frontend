
import React from 'react';
import {  Message, Icon } from 'semantic-ui-react';

class Loading extends React.Component {


    render() {
      return <Message icon>
          <Icon name='circle notched' loading />
          <Message.Content>
            <Message.Header>Stattr Dattr</Message.Header>
            Content coming soon...
          </Message.Content>
      </Message>
      
      }
    }

  export default Loading