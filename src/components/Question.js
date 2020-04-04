import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleNewAnswer } from '../actions/shared'
import { Link } from 'react-router-dom';

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
    <div>
      <h3> {this.props.author.name} asks</h3>
      <form className="border">
        <div style={{ width: 128, height: 128, 
            backgroundImage:`url(${this.props.author.avatarURL})` }}>
        </div>
        <p>Would you rather</p>
        <a>
          ...{this.props.question.optionOne.text.substring(0,15) }...
        </a>
        <div className="form-polling">
          <Link to={`/question/${this.props.question.id}`}><button className="form-poll">View{'\u00A0'}Poll</button></Link>
        </div>
      </form>
    </div>
  );

  renderUnansweredQuestion = ()=>(
    <div className="window">
      <div className="window-model">
        <h1>
          {this.props.author.name} asks:
        </h1>
        <hr/>
        <form className="ChoicesForm">
          <div style={{ width: 128, height: 128, 
              backgroundImage:`url(${this.props.author.avatarURL})` }}>
          </div>
          <p>Would you rather...</p>
          <div className="option">
            <label>
              <input type="radio" value="optionOne" 
                checked={this.state.selectedOption === 'optionOne'} 
                onChange={(e)=>this.handleChange(e.target.value)} />
                  {this.props.question.optionOne.text}
            </label>
            <label>
              <input type="radio" value="optionTwo" 
                checked={this.state.selectedOption === 'optionTwo'} 
                onChange={(e)=>this.handleChange(e.target.value)} />
                  {this.props.question.optionTwo.text}
            </label>
          </div>
        </form>
        <div className="form-button">
            <button className="form-submit" onClick={this.handleSubmitNewAnswer}>Submit</button>
        </div>
      </div>
    </div>
  );

  renderAnsweredQuestion = ()=>(
    <div>
      <div>
        Asked by {this.props.author.name}
      </div>
      <div style={{ width: 128, height: 128, 
        backgroundImage:`url(${this.props.author.avatarURL})` }}>
      </div>
      {['optionOne','optionTwo'].map((option)=>(
        <div key={option}>
          Would you rather {this.props.question[option].text}?
          {this.props.answer===option && <div>Your Choice</div>}
          <div>{100*this.props.question[option].votes.length/this.props.sum}%</div>
        </div>
      ))}
    </div>
  );

  render(){
    const { question } = this.props
    console.log(this.props);
    return(
      question ? !this.props.fullrender ? this.renderSmallQuestion()
      : this.props.answer ? this.renderAnsweredQuestion():this.renderUnansweredQuestion():<div>404 Question Not Found</div>
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