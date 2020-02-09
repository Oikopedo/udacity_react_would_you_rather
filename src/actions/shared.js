import { getInitialData } from '../utils/api'
import { receiveUsers, newQuestionFromUser } from './users'
import { receiveQuestions, addQuestion } from './questions'
import { setAuthedUser } from './authedUser'
import { showLoading, hideLoading } from 'react-redux-loading'
import { _saveQuestion} from '../utils/_DATA'

const AUTHED_ID = 'sarahedo';

export function handleInitialData(){
  
  return (dispatch)=>{
    dispatch(showLoading());
    return getInitialData()
      .then(({ users, questions })=>{
        dispatch(receiveUsers(users));
        dispatch(receiveQuestions(questions));
        dispatch(setAuthedUser(AUTHED_ID));
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