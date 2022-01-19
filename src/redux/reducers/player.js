import { ADD_USER } from '../actions/index';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};
const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_USER:
    return {
      ...state,
      name: action.user.userName,
      gravatarEmail: action.user.email,
    };
  case 'ADD_POINT':
    return {
      ...state,
      score: action.score.score,
      assertions: action.score.assertions,
    };
  default:
    return state;
  }
};

export default player;
