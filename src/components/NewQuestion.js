import React, { Component } from 'react'
import { handleNewQuestion } from '../actions/shared'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';

class NewQuestion extends Component{

  state = {
    optionOne: '',
    optionTwo: '',
    toHome:false
  };

  handleChange = (value,id)=>{this.setState((currentstate)=>{
    currentstate[id]=value;
    return{
      optionOne:currentstate.optionOne,
      optionTwo:currentstate.optionTwo
    };
  })}

  handleSubmit = (e) => {
    e.preventDefault();

    const { optionOne, optionTwo } = this.state;
    const { dispatch } = this.props;

    dispatch(handleNewQuestion(optionOne, optionTwo));

    this.setState(() => ({
      optionOne: '',
      optionTwo:'',
      toHome:true
    }));
  }

  render(){
    const { optionOne, optionTwo,toHome }=this.state
    if (toHome){
      return <Redirect to='/'/>
    } 
    return(
      <div>
        <div>
          Create New Question
        </div>
        <div>
          Complete the Question
        </div>
        <div>
          Would you rather
        </div>
        <form onSubmit={this.handleSubmit}>
          <textarea
            placeholder="Enter Option One Text Here"
            value={optionOne}
            onChange={(e)=>this.handleChange(e.target.value,'optionOne')}
            className='textarea'
            maxLength={100}
          />
          <div>
            OR
          </div>
          <textarea
            placeholder="Enter Option Two Text Here"
            value={optionTwo}
            onChange={(e)=>this.handleChange(e.target.value,'optionTwo')}
            className='textarea'
            maxLength={100}
          />
          <button
            type='submit'
            disabled={optionOne === '' || optionTwo===''}>
              Submit
          </button>
        </form>
      </div>
    );  
  }
}

export default connect()(NewQuestion)