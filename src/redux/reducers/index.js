import { combineReducers } from 'redux';
import token from './tokenPlayer';
import player from './player';
import questions from './questions';

const rootReducer = combineReducers({
  token,
  player,
  questions,
});

export default rootReducer;
