import React,{ Component } from 'react'
import { connect } from 'react-redux'
import { handleUnsetUser } from '../actions/authedUser'

class SignOut extends Component{

  handleSignOut = ()=>{
    const { dispatch } = this.props
    dispatch(handleUnsetUser())
  }

  render(){
    const { user } = this.props
    return(
      <div class="main-entrance">
        {user 
          ? (
            <a>
              Hello {user.name}
              <button className="btn btn-entrance"onClick={this.handleSignOut}>SignOut</button>
            </a>)
          : null}
      </div>
    )
  };
}

function mapStateToProps({users, authedUser}){
  return authedUser!==null ? {user:users[authedUser]}:{};
}

export default connect(mapStateToProps)(SignOut)