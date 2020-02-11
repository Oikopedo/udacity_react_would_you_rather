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
      <div>
        {this.props.author.name} asks
      </div>
      <div style={{ width: 128, height: 128, 
          backgroundImage:`url(${this.props.author.avatarURL})` }}>
      </div>
      <div>
        Would you rather
      </div>
      <div>
        ...{this.props.question.optionOne.text.substring(0,15) }...
      </div>
      <Link to={`/question/${this.props.question.id}`}><button >View Poll</button></Link>
    </div>
  );

  renderUnansweredQuestion = ()=>(
    <div>
      <div>
        {this.props.author.name} asks
      </div>
      <div style={{ width: 128, height: 128, 
          backgroundImage:`url(${this.props.author.avatarURL})` }}>
      </div>
      <div>
        Would you rather
      </div>
      <div className="radio">
        <label>
          <input type="radio" value="optionOne" 
            checked={this.state.selectedOption === 'optionOne'} 
            onChange={(e)=>this.handleChange(e.target.value)} />
              {this.props.question.optionOne.text}
        </label>
      </div>
      <div className="radio">
        <label>
          <input type="radio" value="optionTwo" 
            checked={this.state.selectedOption === 'optionTwo'} 
            onChange={(e)=>this.handleChange(e.target.value)} />
              {this.props.question.optionTwo.text}
        </label>
      </div>
      <button onClick={this.handleSubmitNewAnswer}>Submit</button>
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