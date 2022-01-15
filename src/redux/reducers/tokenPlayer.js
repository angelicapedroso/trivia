import { TOKEN_PLAYER_API } from '../actions';

const INITIAL_STATE = '';

const tokenPlayer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case TOKEN_PLAYER_API:
    return action.payload;
  default:
    return state;
  }
};

export default tokenPlayer;
