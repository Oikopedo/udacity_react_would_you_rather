import { RECEIVE_USERS,NEW_QUESTION_FROM_USER,ADD_ANSWER_TO_USER,REMOVE_ANSWER_FROM_USER } from '../actions/users'

export default function users(state = {},action){
  switch(action.type){
    case RECEIVE_USERS:
      return{
        ...state,
        ...action.users
      };

    case NEW_QUESTION_FROM_USER:
      return newQuestion(state,action);

    case ADD_ANSWER_TO_USER:
      return addAnswer(state,action);

    case REMOVE_ANSWER_FROM_USER:
      return removeAnswer(state,action);
    default:
      return state;
  }
}

function newQuestion(state,action){
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
}

function addAnswer(state,action){
  const {questionId,userId,vote} = action;
  const user = {
    [userId]:{
      ...state[userId],
      answers:{
        ...state[userId].answers,
        [questionId]:vote
      }
    }
  };

  return {
    ...state,
    ...user
  };
}

function removeAnswer(state,action){
  const {questionId,userId} =action;
  const answers={}
  state[userId].answers.entries().forEach((kv)=>{
    kv[0]!==questionId && (answers[kv[0]]=kv[1])
  });
  const user = {
    [userId]:{
      ...state[userId],
      answers,
    }
  }
  return {
    ...state,
    ...user
  }
}
