export const RECEIVE_USERS = 'RECEIVE_USERS';
export const NEW_QUESTION_FROM_USER = 'NEW_QUESTION_FROM_USER';
export const ADD_ANSWER_TO_USER = 'ADD_ANSWER_TO_USER';
export const REMOVE_ANSWER_FROM_USER = 'REMOVE_ANSWER_FROM_USER';

export function receiveUsers(users){
  return{
    type:RECEIVE_USERS,
    users,
  };
}

export function newQuestionFromUser(userId,questionId){
  return{
    type:NEW_QUESTION_FROM_USER,
    userId,
    questionId
  };
}

export function addAnswerToUser(userId,questionId,vote){
  return{
    type : ADD_ANSWER_TO_USER,
    userId,
    questionId,
    vote
  };
}

export function removeAnswerFromUser(userId,questionId){
  return{
    type : REMOVE_ANSWER_FROM_USER,
    userId,
    questionId,
  }
}
