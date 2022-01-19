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
      name: action.score.name,
      score: action.score.score,
      gravatarEmail: action.score.picture,
    };
  default:
    return state;
  }
};

export default player;
