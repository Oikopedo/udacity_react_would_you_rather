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
      <div className="content">
        <div className="content-model">
          <h2>Create New Question</h2>
          <hr/>
          <a>Complete the Question</a>
          <p>Would you rather</p>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <textarea
                placeholder="Enter Option One Text Here"
                value={optionOne}
                onChange={(e)=>this.handleChange(e.target.value,'optionOne')}
                className='form-group form-control'
                maxLength={100}
              />
            </div>
            <p>OR</p>
            <div className="form-group">
              <textarea
                placeholder="Enter Option Two Text Here"
                value={optionTwo}
                onChange={(e)=>this.handleChange(e.target.value,'optionTwo')}
                className='form-group form-control'
                maxLength={100}
              />
            </div>
            <div className="form-btn">
              <button className="form-exit"
                type='submit'
                disabled={optionOne === '' || optionTwo===''}>
                  Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );  
  }
}

export default connect()(NewQuestion)