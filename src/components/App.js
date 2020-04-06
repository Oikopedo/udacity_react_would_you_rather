import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard'
import  LoadingBar  from 'react-redux-loading'
import NewQuestion from './NewQuestion'
import LeaderBoard from './LeaderBoard'
import { BrowserRouter, Route } from 'react-router-dom'
import QuestionPage from './QuestionPage'
import Nave from './Nav'
import SignIn from './SignIn'


class App extends Component{
  componentDidMount(){
    this.props.dispatch(handleInitialData());
  }

  render(){
    const {loading,signin}=this.props
    return (
      <BrowserRouter>
        <LoadingBar/>
        <Nave/>
        <div className="main">
          {loading
            ? null
            : signin ?<SignIn/>:<div>
              <Route exact path='/' component={Dashboard}/>
              <Route path='/new' component={NewQuestion}/>
              <Route path='/leaderboard' component={LeaderBoard}/>
              <Route path='/question/:id' component={QuestionPage}/>
            </div>
          }
        </div>
      </BrowserRouter>
    );
  }
}

function mapStateToProps({ authedUser,users }){
  return {
    loading:users.length===0,
    signin:authedUser===null
  };
}

export default connect(mapStateToProps)(App)
