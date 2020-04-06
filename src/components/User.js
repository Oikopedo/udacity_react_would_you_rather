import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Image} from 'react-bootstrap'

class User extends Component{
  
  render(){
    const { user } = this.props;
    console.log('user: ',user);
    const answers = Object.keys(user.answers).length;
    const questions=user.questions.length;
    return(
      <div className="container">
        <div className="row">
          <div className="col text-center"><h5>{user.name}</h5></div>
        </div>
        <div className="row">
          <div className="col-3 mr-4">
            <Image src={user.avatarURL}  rounded/>
          </div>
          <div className="col">
            <div className="container">
              <div className="row">
                <div className="col text-center">Answered Questions</div>
              </div>
              <div className=" mb-3">
                <div className="col text-center">{answers}</div>
              </div>
              <div className="row">
                <div className="col text-center">Created Questions</div>
              </div>
              <div className="row">
                <div className="col text-center">{questions}</div>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="container">
              <div className="row">
                <div className="col text-center"><h5>Sum</h5></div>
              </div>
              <div className="row">
                <div className="col text-center"><h1>{answers+questions}</h1></div>
              </div>
            </div>
          </div>
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