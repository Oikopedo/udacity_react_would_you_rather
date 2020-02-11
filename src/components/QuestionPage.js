import React,{ Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question';

class QuestionPage extends Component{
  
  render(){
    const { id } =this.props
    return(
      <Question id={id} fullrender={true}/>
    )
  }
}

function mapStateToProps({},props){
  const { id } = props.match.params;
  return{
    id
  };
}

export default connect(mapStateToProps)(QuestionPage)