import React, { Component } from 'react'
import { handleNewQuestion } from '../actions/shared'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import {Button,InputGroup,FormControl} from 'react-bootstrap'

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
    return (
      <div className="container">
        <div className="row">
          <div className="col text-center"><h1>Create New Question</h1></div>
        </div>
        <div className="row">
          <div className="col">Complete the question</div>
        </div>
        <div className="row">
          <div className="col"><h3>Would you rather</h3></div>
        </div>
        <div className="row">
          <InputGroup className="mb-3 mt-3">
            <FormControl
              placeholder="Enter Option One Text Here"
              value={optionOne}
              onChange={(e)=>this.handleChange(e.target.value,'optionOne')}
              maxLength={100}
            />
          </InputGroup>
        </div>
        <div className="row">
          <div className="col text-center"><h3>OR</h3></div>
        </div>
        <div className="row">
          <InputGroup className="mb-3 mt-3">
            <FormControl
              placeholder="Enter Option Two Text Here"
              value={optionTwo}
              onChange={(e)=>this.handleChange(e.target.value,'optionTwo')}
              maxLength={100}
            />
          </InputGroup>
        </div>
        <div className="row">
          <Button
            variant="primary"
            size="lg"
            block
            disabled={optionOne === '' || optionTwo===''}
            onClick={this.handleSubmit}>
              Submit
          </Button>
        </div>
      </div>
    );
  }
}

export default connect()(NewQuestion)