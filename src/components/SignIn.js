import React from 'react'
import { connect } from 'react-redux'
import { handleSetUser } from '../actions/authedUser';
import { ButtonGroup, DropdownButton, Dropdown } from 'react-bootstrap';

const SignIn=({ users, handleSetUser }) => {
  console.log(users)
  return(
    <div className="container">
      <div className="row">
        <div className="col text-center"><h1>Log In</h1></div>
      </div>
      <div className="row">
        <div className="col text-center">
        <DropdownButton as={ButtonGroup} 
          variant="primary" 
          title="Select User"  
          id="Select User"
          onSelect={ (evt) => handleSetUser(evt) }>
          {Object.keys(users).map((id) => (
            <Dropdown.Item key={ id } eventKey={ id } as="button">{ users[id].name } </Dropdown.Item>
          ))}
        </DropdownButton>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps({ users }){
  return{
    users
  };
}

export default connect(mapStateToProps,{ handleSetUser })(SignIn)