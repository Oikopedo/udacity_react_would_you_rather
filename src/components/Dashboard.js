import React, { Component } from 'react'
import { connect } from 'react-redux'
import SmallQuestion from './SmallQuestion'
import { ListGroup, Tabs, Tab } from 'react-bootstrap'

class Dashboard extends Component{

  state={
    'showUnanswered':true,
  };

  showUnanswered = (showUnanswered) => (
    this.setState({
      showUnanswered
    })
  );

  render(){
    console.log('Dashboard: ',this.props);
    console.log('state: ',this.state);
    const { showUnanswered } = this.state
    return (
      <div className="container">
        <div className="row">
          <div className="col text-center"><h1>Questions</h1></div>
        </div>
        <Tabs activeKey={ showUnanswered ? "uaq" : "aq" } className="justify-content-around" 
              id="questions-tabs"
              onSelect={ (k) => k === "aq" ? this.showUnanswered(false):this.showUnanswered(true)}>
          <Tab eventKey="uaq" title="Unanswered Questions"/>
          <Tab eventKey="aq" title="Answered Questions"/>
        </Tabs>
        <ListGroup>
          {
            this.props[showUnanswered ? 'unanswered' : 'answered'].map((id)=>(
              <ListGroup.Item key={ id }>
                <SmallQuestion id={ id }/>
              </ListGroup.Item>
            )) 
          }
        </ListGroup>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users, questions }){
  const ids = Object.keys(questions)
    .sort((a,b) => questions[b].timestamp - questions[a].timestamp);
  const user = users[authedUser];
  const unanswered = [];
  const answered = [];
  ids.forEach((id) => (
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