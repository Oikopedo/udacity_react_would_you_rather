export const SET_AUTHED_USER = 'SET_AUTHED_USER';
export const UNSET_AUTHED_USER = 'UNSET_AUTHED_USER';

function setAuthedUser(id){
  return {
    type:SET_AUTHED_USER,
    id,
  };
}

function unsetAuthedUser(){
  return {
    type:UNSET_AUTHED_USER
  }
}

export function handleSetUser(id){

  return (dispatch)=>{
    return dispatch(setAuthedUser(id));
  }
}

export function handleUnsetUser(){
  return (dispatch)=>(
    dispatch(unsetAuthedUser())
  )
}
