import React from 'react'
import { NavLink } from 'react-router-dom'
import SignOut from './SignOut'
import {Navbar,Nav} from 'react-bootstrap'

export default function Nave () {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto mt-4 mb-4">
          <NavLink className="ml-5 " to='/' exact activeClassName='active'>Home</NavLink>
          <NavLink className="ml-5" to='/new' activeClassName='active'>New Question</NavLink>
          <NavLink className="ml-5 " to='/leaderboard' activeClassName='active'>Leaderboard</NavLink>
        </Nav>
        <SignOut/>
      </Navbar.Collapse>
    </Navbar>
  );
}
