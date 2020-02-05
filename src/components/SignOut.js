import React,{ Component } from 'react'
import { connect } from 'react-redux'
import { handleUnsetUser } from '../actions/authedUser'
import {Navbar,Button} from 'react-bootstrap'

class SignOut extends Component{

  handleSignOut = ()=>{
    const { dispatch } = this.props
    dispatch(handleUnsetUser())
  };

  render(){
    const { user } = this.props
    return(
      <Navbar.Text>
          {user
            ? (
              <p>Hello {user.name}
                <Button className="ml-5" variant='primary' onClick={this.handleSignOut}>SignOut</Button>
              </p>
            )
            :null}
      </Navbar.Text>
    )
  };
}

function mapStateToProps({users, authedUser}){
  return authedUser!==null ? {user:users[authedUser]}:{};
}

export default connect(mapStateToProps)(SignOut)