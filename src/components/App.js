import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard'
import  LoadingBar  from 'react-redux-loading'
import Question from './Question'
import NewQuestion from './NewQuestion'


class App extends Component{
  componentDidMount(){
    this.props.dispatch(handleInitialData());
  }

  render(){
    return (
      <div>
        <LoadingBar/>
        {this.props.loading
          ? null
          :<Question id={'vthrdm985a262al8qx3do'} fullrender={true}/>
        }
      </div>
    );
  }
}

function mapStateToProps({ authedUser }){
  return {
    loading:authedUser===null
  };
}

export default connect(mapStateToProps)(App)
