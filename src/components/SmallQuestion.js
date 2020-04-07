import React from 'react'
import { connect } from 'react-redux';
import { Image, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';

const SmallQuestion = ({ question, author }) =>(
  <div className="container">
    <div className="row">
      <div className="col text-center">
        <h5>{ author.name } asks</h5>
      </div>
    </div>
    <div className="row">
      <div className="col-3 mr-4" >
          <Image src={ author.avatarURL }  rounded/>
      </div>
      <div className="col">
        <div className="container">
          <div className="row mb-3">
            <div className="col text-center">Would you rather</div>
          </div>
          <div className="row mb-3">
            <div className="col text-center">...{ question.optionOne.text.substring(0,15) }...</div>
          </div>
          <div className="row">
            <div className="col">
              <Link to={`/question/${ question.id }`}><Button variant="primary" block>View Poll</Button></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

function mapStateToProps({ questions, users },{ id }){
  const question = questions[id];
  const author = users[question.author];
  return{
    question,
    author
  }
}

export default connect(mapStateToProps)(SmallQuestion)