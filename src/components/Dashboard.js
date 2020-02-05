import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import { ListGroup,Tabs,Tab } from 'react-bootstrap'

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
    return (
      <div className="container">
        <div className="row">
          <div className="col text-center"><h1>Questions</h1></div>
        </div>
        <Tabs activeKey={this.state.showUnanswered?"uaq":"aq"} className="justify-content-around" 
              id="questions-tabs"
              onSelect={(k)=>k==="aq"?this.showUnanswered(false):this.showUnanswered(true)}>
          <Tab eventKey="uaq" title="Unanswered Questions"/>
          <Tab eventKey="aq" title="Answered Questions"/>
        </Tabs>
        <ListGroup>
          {
            this.props[this.state.showUnanswered?'unanswered':'answered'].map((id)=>(
              <ListGroup.Item key={id}>
                <Question id={id} fullrender={false}/>
              </ListGroup.Item>
            )) 
          }
        </ListGroup>
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