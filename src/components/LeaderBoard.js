import React, { Component } from 'react'
import { connect } from 'react-redux'
import User from './User'

class Leaderboard extends Component{
  render(){
    return(
      <div>
        <ul>
          {this.props.ids.map((id)=>(
            <li key={id}>
              <User id={id}/>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps({ users }){
  const ids = Object.keys(users).sort((a,b)=>(
    Object.keys(users[b].answers).length+users[b].questions.length-
    Object.keys(users[a].answers).length-users[a].questions.length
  ));
  return {
    ids
  };
}

export default connect(mapStateToProps)(Leaderboard)