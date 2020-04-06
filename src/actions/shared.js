import { getInitialData } from '../utils/api'
import { receiveUsers, newQuestionFromUser, addAnswerToUser, removeAnswerFromUser } from './users'
import { receiveQuestions, addQuestion, addVoteToQuestion, removeVoteFtomQuestion } from './questions'
import { showLoading, hideLoading } from 'react-redux-loading'
import { _saveQuestion, _saveQuestionAnswer} from '../utils/_DATA'

export function handleInitialData(){
  return (dispatch)=>{
    dispatch(showLoading());
    return getInitialData()
      .then(({ users, questions })=>{
        dispatch(receiveUsers(users));
        dispatch(receiveQuestions(questions));
        dispatch(hideLoading());
      });
  };
}

export function handleNewQuestion(optionOneText,optionTwoText){
  return (dispatch,getState)=>{
    dispatch(showLoading());
    const { authedUser} = getState();
    return _saveQuestion({
      optionOneText,
      optionTwoText,
      author:authedUser
    })
    .then((question)=>{
      dispatch(addQuestion (question));
      dispatch(newQuestionFromUser(authedUser,question.id));
      dispatch(hideLoading());
    });
  };
}

export function handleNewAnswer(userId,questionId,vote){
  return (dispatch)=>{
    dispatch(addVoteToQuestion(questionId,userId,vote));
    dispatch(addAnswerToUser(userId,questionId,vote))
    console.log("save",userId,questionId,vote);
    return _saveQuestionAnswer({
      authedUser:userId,
      qid:questionId,
      answer:vote
      }).catch((e)=>{
        console.warn('Error in handleNewAnswer: ', e);
        dispatch(removeAnswerFromUser(userId,questionId));
        dispatch(removeVoteFtomQuestion(questionId,userId));
        alert('The was an error submitting your vote. Try again.')
      })
  }
}