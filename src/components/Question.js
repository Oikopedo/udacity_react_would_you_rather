import React, { Component } from 'react'
import { connect } from 'react-redux'

class Question extends Component{

  state ={
    selectedOption:'optionOne'
  };

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
      <button >View Poll</button>
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
            onChange={()=>alert('optionOne')} />
              {this.props.question.optionOne.text}
        </label>
      </div>
      <div className="radio">
        <label>
          <input type="radio" value="optionTwo" 
            checked={this.state.selectedOption === 'optionTwo'} 
            onChange={()=>alert('optionTwo')} />
              {this.props.question.optionTwo.text}
        </label>
      </div>
      <button>Submit</button>
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
        <div>
          Would you rather {this.props.question[option].text}?
          {this.props.answer===option && <div>Your Choice</div>}
          <div>{100*this.props.question[option].votes.length/this.props.sum}%</div>
        </div>
      ))}
    </div>
  );

  render(){
    console.log(this.props);
    return(
      !this.props.fullrender ? this.renderSmallQuestion()
      : this.props.answer ? this.renderAnsweredQuestion():this.renderUnansweredQuestion()
    );
  }
}


function mapStateToProps({ authedUser, users, questions}, { id,fullrender }){
  const question=questions[id];
  const author=users[question.author];
  const answer= users[authedUser].answers[id];
  const sum = question.optionOne.votes.length+question.optionTwo.votes.length;

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