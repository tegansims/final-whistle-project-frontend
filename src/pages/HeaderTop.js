import React from 'react';
import {  Segment, Header } from 'semantic-ui-react'


const style = {
    // background: '#3E4E56', 
    color: 'white',
    marginBottom: 0,
    minHeight: 220
     
  } 

class HeaderTop extends React.Component {

  
    render(){
        return <div style={style}>
        <br></br>
        <Header 
          inverted textAlign='center'
          as='h1'
          content='Final Whistle'
        />    
          <Header
            as='h3'
            content="Connect with your team from anywhere"
            inverted
            textAlign = 'center'
          />
        {/* <Image src='./images/Whistle-512.png'/>   */}
      </div>
    }

}

export default HeaderTop;