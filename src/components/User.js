import React, { Component } from 'react'
import { connect } from 'react-redux'

class User extends Component{
  
  render(){
    const { user } = this.props;
    console.log('user: ',user);
    const answers = Object.keys(user.answers).length;
    const questions=user.questions.length;
    return(
      <div>
        <div>
          {user.name}
        </div>
        <div style={{ width: 128, height: 128, 
          backgroundImage:`url(${user.avatarURL})` }}>
        </div>
        <div>
          Answered Questions {answers}
        </div>
        <div>
          Created Questions {questions}
        </div>
        <div>
          Sum {answers+questions}
        </div>
      </div>
    );
  }
}

function mapStateToProps({users},{id}){
  return{
    user:users[id]
  }
}

export default connect(mapStateToProps)(User)