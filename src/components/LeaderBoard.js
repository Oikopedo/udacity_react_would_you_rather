import React from 'react'
import { connect } from 'react-redux'
import User from './User'
import { ListGroup } from 'react-bootstrap';

const Leaderboard=({ ids })=>{
  let counter = 0;
  return(
    <ListGroup>
        {ids.map((id) => {
          counter += 1;
          return (<ListGroup.Item key={ id }>
            <div className="container">
              <div className="row">
                <div className="col-1" ><h1>{ counter }</h1></div>
                <div className="col"><User id={ id }/></div>
              </div>
            </div>
          </ListGroup.Item>)
        })}
    </ListGroup>
  )
}

function mapStateToProps({ users }){
  const ids = Object.keys(users).sort((a,b)=>(
    Object.keys(users[b].answers).length + users[b].questions.length -
    Object.keys(users[a].answers).length - users[a].questions.length
  ));
  return {
    ids
  };
}

export default connect(mapStateToProps)(Leaderboard)