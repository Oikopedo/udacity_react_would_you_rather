import React,{Component} from 'react'
import { connect } from 'react-redux';
import { Image, Form, Button } from 'react-bootstrap'
import { handleNewAnswer } from '../actions/shared'

class UnansweredQuestion extends Component{
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
    const { authedUser, question } = this.props;

    this.props.handleNewAnswer(authedUser, question.id, selectedOption);

    this.setState({
      selectedOption:'optionOne'
    });
  }

  render(){
    const { author, question }=this.props
    return (
      <div className="container">
        <div className="row mb-3">
          <div className="col text-center"><h3>{ author.name } asks</h3></div>
        </div>
        <div className="row">
          <div className="col-3 mr-4">
              <Image src={ author.avatarURL }  rounded/>
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
                    checked={ this.state.selectedOption === 'optionOne' } 
                    label={ question.optionOne.text }
                    onChange={ (e) => this.handleChange(e.target.value) }
                  />
                  <Form.Check 
                    type="radio"
                    value="optionTwo"
                    checked={ this.state.selectedOption === 'optionTwo' } 
                    label={ question.optionTwo.text }
                    onChange={ (e) => this.handleChange(e.target.value) }
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
          onClick={ this.handleSubmitNewAnswer }>
            Submit
        </Button>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ questions, users, authedUser }, { id }){
  const question = questions[id];
  const author = users[question.author];
  return{
    authedUser,
    question,
    author
  }
}

export default connect(mapStateToProps, { handleNewAnswer })(UnansweredQuestion)