
import React from 'react';
import {  Message, Icon} from 'semantic-ui-react';


class Loading extends React.Component {

    render() {
      return <div>
      <Message icon>
          <Icon name='circle notched' loading />
      </Message>
      </div>
      }
    }

  export default Loading