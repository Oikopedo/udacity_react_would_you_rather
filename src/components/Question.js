import React from 'react'
import { connect } from 'react-redux'
import UnansweredQuestion from './UnaswerdQuestion'
import AnsweredQuestion from './AnsweredQuestion';

const Question = ({ id, question, answer })=>(
  question 
    ? answer 
      ? <AnsweredQuestion id={ id }/>
      :<UnansweredQuestion id={ id }/>
    :<div><h1>404 Question Not Found</h1></div>
)


function mapStateToProps({ authedUser, users, questions }, props){
  const { id } = props.match.params;
  const question = questions[id];
  const answer = users[authedUser].answers[id];

  return{
    id,
    question,
    answer
  };
}

export default connect(mapStateToProps)(Question)