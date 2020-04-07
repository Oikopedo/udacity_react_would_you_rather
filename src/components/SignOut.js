import React from 'react'
import { connect } from 'react-redux'
import { handleUnsetUser } from '../actions/authedUser'
import { Navbar, Button } from 'react-bootstrap'

const SignOut = ({ user, handleUnsetUser }) => (
  <Navbar.Text>
      { user
        ? (
          <p>Hello { user.name }
            <Button className="ml-5" variant='primary' onClick={ handleUnsetUser }>SignOut</Button>
          </p>
        )
        :null }
  </Navbar.Text>
)

function mapStateToProps({ users, authedUser }){
  return authedUser !== null ? { user:users[authedUser] } : {};
}

export default connect(mapStateToProps,{ handleUnsetUser })(SignOut)