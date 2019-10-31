import React from 'react';
import { NavLink } from 'react-router-dom';

const link = {
  width: '100px',   
  padding: '12px',
  margin: '0 6px 6px',
  background: '#B01943',
  textDecoration: 'none',
  color: 'white',
  borderRadius: '5px'
} 


class NavBar extends React.Component {
  render() {
    return (
      <div className='navbar'>
        <NavLink to='/' exact style={link}>Home</NavLink>
        <NavLink to='/games' exact style={link}>Games</NavLink>
        <NavLink to='/stats' exact style={link}>Stats</NavLink>
        <NavLink to='/settings' exact style={link}>Settings</NavLink>
        <NavLink to='/tactics' exact style={link}>Tactics</NavLink>
        {this.props.username ? <NavLink to='/tactics' exact style={link}>LogOut</NavLink> : null}
        {/* change the above link to LogOut page!  */}
      </div>
    );
  }
};

export default NavBar;

