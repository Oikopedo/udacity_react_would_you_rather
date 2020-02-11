import React,{ Component } from 'react'
import { connect } from 'react-redux'
import { handleSetUser } from '../actions/authedUser';

class SignIn extends Component{

  state={
    user:'DEFAULT'
  }

  handleChange= (value)=>(
    this.setState({
      user:value
    })
  );

  handleUserSubmit = ()=>{

    const { dispatch } = this.props
    const { user } = this.state
    dispatch(handleSetUser(user))
  }

  render(){
    const { users }=this.props
    const { user } = this.state 
    console.log(this.state)
    return(
      <div>
        <select id="user" value={this.state.user} onChange={(e)=>this.handleChange(e.target.value)}>
          <option key='0' value='DEFAULT' disabled>Select User</option>
          {Object.keys(users).map((id)=>(
            <option key={id} value={id}>{users[id].name} </option>
          ))}
        </select>
        <button onClick={this.handleUserSubmit} disabled={user==='DEFAULT'}>Submit</button>
      </div>
    )
  }
}

function mapStateToProps({users}){
  return{
    users
  }
}

export default connect(mapStateToProps)(SignIn)