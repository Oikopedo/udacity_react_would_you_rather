import { RECEIVE_USERS,NEW_QUESTION_FROM_USER } from '../actions/users'

export default function users(state = {},action){
  switch(action.type){
    case RECEIVE_USERS:
      return{
        ...state,
        ...action.users
      };
    case NEW_QUESTION_FROM_USER:
      const { userId, questionId} = action;
      const user = {
        [userId]:{
          ...state[userId],
          questions: state[userId].questions.concat([questionId])
        }
      };
      return {
        ...state,
        ...user
      };
    default:
      return state;
  }
}