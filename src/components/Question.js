import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleNewAnswer } from '../actions/shared'
import { Link } from 'react-router-dom';
import {Image,Form,Button} from 'react-bootstrap'

class Question extends Component{

  state ={
    selectedOption:'optionOne'
  };

  handleChange = (value) => (
    this.setState({
      selectedOption : value
    })
  );

  handleSubmitNewAnswer = (e) =>{
    e.preventDefault();
    const { selectedOption } = this.state;
    const {authedUser,question,dispatch} = this.props;

    dispatch(handleNewAnswer(authedUser,question.id,selectedOption));

    this.setState({
      selectedOption:'optionOne'
    });
  }

  renderSmallQuestion = () =>(
    <div className="container">
      <div className="row">
        <div className="col text-center">
          <h5>{this.props.author.name} asks</h5>
        </div>
      </div>
      <div className="row">
        <div className="col-3 mr-4" >
            <Image src={this.props.author.avatarURL}  rounded/>
        </div>
        <div className="col">
          <div className="container">
            <div className="row mb-3">
              <div className="col text-center">Would you rather</div>
            </div>
            <div className="row mb-3">
              <div className="col text-center">...{this.props.question.optionOne.text.substring(0,15) }...</div>
            </div>
            <div className="row">
              <div className="col">
                <Link to={`/question/${this.props.question.id}`}><Button variant="primary" block>View Poll</Button></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  renderUnansweredQuestion = ()=>(
    <div className="container">
      <div className="row mb-3">
        <div className="col text-center"><h3>{this.props.author.name} asks</h3></div>
      </div>
      <div className="row">
        <div className="col-3 mr-4">
            <Image src={this.props.author.avatarURL}  rounded/>
        </div>
        <div className="col">
          <div className="container">
            <div className="row mb-3">
              Would your rather
            </div>
            <div className="row">
              <Form>
                <Form.Check 
                  type="radio"
                  value="optionOne"
                  checked={this.state.selectedOption === 'optionOne'} 
                  label={this.props.question.optionOne.text}
                  onChange={(e)=>this.handleChange(e.target.value)}
                />
                <Form.Check 
                  type="radio"
                  value="optionTwo"
                  checked={this.state.selectedOption === 'optionTwo'} 
                  label={this.props.question.optionTwo.text}
                  onChange={(e)=>this.handleChange(e.target.value)}
                />
              </Form>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
      <Button
        variant="primary"
        size="lg"
        block
        onClick={this.handleSubmitNewAnswer}>
          Submit
      </Button>
      </div>
    </div>
  );

  renderAnsweredQuestion = ()=>(
    <div className="container">
      <div className="row mb-3">
        <div className="col text-center"><h3>Asked by {this.props.author.name}</h3></div>
      </div>
      <div className="row">
        <div className="col-3 mr-4">
            <Image src={this.props.author.avatarURL}  rounded/>
        </div>
        <div className="col">
        {['optionOne','optionTwo'].map((option)=>(
          <div key={option} className="mb-3 text-center">
            Would you rather {this.props.question[option].text}?
            {this.props.answer===option && <div className="vote">Your Vote</div>}
            <div className="row justify-content-between">
              <div className="col text-left">Votes: {this.props.question[option].votes.length}</div>
              <div className="col text-right">Percentage: {Math.round(100*this.props.question[option].votes.length/this.props.sum)}%</div>
            </div>
          </div>
        ))}
        </div>
      </div>
    </div>
  );

  render(){
    const { question } = this.props
    console.log(this.props);
    return(
      question ? !this.props.fullrender ? this.renderSmallQuestion()
      : this.props.answer ? this.renderAnsweredQuestion():this.renderUnansweredQuestion():<div><h1>404 Question Not Found</h1></div>
    );
  }
}


function mapStateToProps({ authedUser, users, questions}, { id,fullrender }){
  const question=questions[id];
  const author=question && users[question.author];
  const answer= users[authedUser].answers[id];
  const sum = question && question.optionOne.votes.length+question.optionTwo.votes.length;

  return{
    authedUser,
    question,
    author,
    fullrender,
    answer,
    sum
  };
}

export default connect(mapStateToProps)(Question)