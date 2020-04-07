import React from 'react'
import { connect } from 'react-redux';
import { Image } from 'react-bootstrap';


const AnsweredQuestion = ({ question, author, answer, sum })=>(
  <div className="container">
    <div className="row mb-3">
      <div className="col text-center"><h3>Asked by { author.name }</h3></div>
    </div>
    <div className="row">
      <div className="col-3 mr-4">
          <Image src={ author.avatarURL }  rounded/>
      </div>
      <div className="col">
      { ['optionOne', 'optionTwo'].map((option) => (
        <div key={ option } className="mb-3 text-center">
          Would you rather { question[option].text }?
          { answer === option && <div className="vote">Your Vote</div>}
          <div className="row justify-content-between">
            <div className="col text-left">Votes: { question[option].votes.length }</div>
            <div className="col text-right">Percentage: { Math.round(100*question[option].votes.length/sum) }%</div>
          </div>
        </div>
      ))}
      </div>
    </div>
  </div>
);

function mapStateToProps({ authedUser, users, questions }, { id }){
  const question=questions[id];
  const author=users[question.author];
  const answer= users[authedUser].answers[id];
  const sum = question.optionOne.votes.length+question.optionTwo.votes.length;

  return{
    question,
    author,
    answer,
    sum
  };
}

export default connect(mapStateToProps)(AnsweredQuestion)