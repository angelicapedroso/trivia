import { ADD_USER } from '../actions/index';

const INITIAL_STATE = {
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_USER:
    return action.user;
  default:
    return state;
  }
};

export default reducer;
