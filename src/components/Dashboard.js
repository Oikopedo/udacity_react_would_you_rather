import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'

class Dashboard extends Component{

  state={
    'showUnanswered':true,
  };

  showUnanswered = (showUnanswered) => (
    this.setState({
      showUnanswered:showUnanswered
    })
  );

  render(){
    console.log('Dashboard: ',this.props);
    console.log('state: ',this.state);
    return(
      <div className="foto">
        <div className="foto-option">
          <div className="answers">
            <div className="questions">
              <button class="unanswered" onClick={()=> this.showUnanswered(true)}>
                Unanswered Questions
              </button>
            </div>
            <div class="qwestionable">
              <button class="answered" onClick={()=>this.showUnanswered(false)}>
                Answered Qwestions
              </button>
            </div>
          </div>
          
          <ul>
            {
              this.props[this.state.showUnanswered?'unanswered':'answered'].map((id)=>(
                <li key={id}>
                  <Question id={id} fullrender={false}/>
                </li>
              )) 
            }
          </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users, questions}){
  const ids = Object.keys(questions)
    .sort((a,b) => questions[b].timestamp - questions[a].timestamp);
  const user = users[authedUser];
  const unanswered = [];
  const answered = [];
  ids.forEach((id)=>(
    typeof user.answers[id]!=="undefined"
    ? answered.push(id)
    : unanswered.push(id)
  ));
  return{
    unanswered,
    answered
  };
}

export default connect(mapStateToProps)(Dashboard)