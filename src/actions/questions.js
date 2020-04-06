export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ADD_QUESTION = 'ADD_QUESTION';
export const ADD_VOTE_TO_QUESTION = 'ADD_VOTE_TO_QUESTION';
export const REMOVE_VOTE_FROM_QUESTION = 'REMOVE_VOTE_FROM_QUESTION';

export function receiveQuestions(questions){
  return {
    type : RECEIVE_QUESTIONS,
    questions,
  };
}

export function addQuestion (question) {
  return {
    type : ADD_QUESTION,
    question,
  };
}

export function addVoteToQuestion(questionId,userId,vote){
  return {
    type : ADD_VOTE_TO_QUESTION,
    questionId,
    userId,
    vote
  };
}

export function removeVoteFtomQuestion(questionId,userId){
  return {
    type : ADD_VOTE_TO_QUESTION,
    questionId,
    userId
  };
}
