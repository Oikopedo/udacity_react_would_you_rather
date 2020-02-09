export const RECEIVE_USERS = 'RECEIVE_USERS';
export const NEW_QUESTION_FROM_USER = 'NEW_QUESTION_FROM_USER';

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
