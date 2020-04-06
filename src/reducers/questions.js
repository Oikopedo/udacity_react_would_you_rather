import { RECEIVE_QUESTIONS, ADD_QUESTION, ADD_VOTE_TO_QUESTION,REMOVE_VOTE_FROM_QUESTION } from '../actions/questions'

export default function questions(state = {},action){
  switch(action.type){
    case RECEIVE_QUESTIONS:
      return{
        ...state,
        ...action.questions
      };

    case ADD_QUESTION :
      return addQuestion(state,action);

    case ADD_VOTE_TO_QUESTION :
      return addVote(state,action);

    case REMOVE_VOTE_FROM_QUESTION :
      return removeVote(state,action);    
      
    default:
      return state;
  }
}

function addQuestion(state,action){
  const { question } = action;

  return {
    ...state,
    [question.id]:question,
  };
}

function addVote(state,action){
  const {questionId,userId,vote} =action;
  const question ={
    [questionId]:{
      ...state[questionId],
      [vote]:{
        ...state[questionId][vote],
        votes : state[questionId][vote].votes.concat([userId])
      }
    }
  };

  return {
    ...state,
    ...question
  };
}

function removeVote(state,action){
  const {questionId,userId} = action;
  const question ={
    [questionId]:{
      ...state[questionId],
      optionOne:{
        ...state[questionId].optionOne,
        votes : state[questionId].optionOne.votes.filter((id)=> (id!==userId))
      },
      optionTwo:{
        ...state[questionId].optionTwo,
        votes : state[questionId].optionTwo.votes.filter((id)=> (id!==userId))
      }
    }
  };

  return{
    ...state,
    ...question
  };
}
