import { combineReducers } from 'redux';
import token from './tokenPlayer';
import { ADD_USER } from '../actions/index';

const INITIAL_STATE = {
  player: '',
};
const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_USER:
    return action.user;
  default:
    return state;
  }
};
const rootReducer = combineReducers({
  token,
  player,
});

export default rootReducer;
