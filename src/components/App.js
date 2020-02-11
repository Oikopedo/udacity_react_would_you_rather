import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard'
import  LoadingBar  from 'react-redux-loading'
import NewQuestion from './NewQuestion'
import LeaderBoard from './LeaderBoard'
import { BrowserRouter, Route } from 'react-router-dom'
import QuestionPage from './QuestionPage'
import Nav from './Nav'


class App extends Component{
  componentDidMount(){
    this.props.dispatch(handleInitialData());
  }

  render(){
    return (
      <BrowserRouter>
        <LoadingBar/>
        <Nav/>
        {this.props.loading
          ? null
          :<div>
            <Route exact path='/' component={Dashboard}/>
            <Route path='/new' component={NewQuestion}/>
            <Route path='/leaderboard' component={LeaderBoard}/>
            <Route path='/question/:id' component={QuestionPage}/>
          </div>
        }
      </BrowserRouter>
    );
  }
}

function mapStateToProps({ authedUser }){
  return {
    loading:authedUser===null
  };
}

export default connect(mapStateToProps)(App)
