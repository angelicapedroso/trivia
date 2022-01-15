import fetchTokenAPI from '../../services/fetchAPI';

export const TOKEN_PLAYER_API = 'TOKEN_PLAYER_API';

export const tokenPlayerAPI = (token) => ({
  type: TOKEN_PLAYER_API,
  payload: token,
});

export const getTokenPlayer = () => async (dispatch) => {
  const response = await fetchTokenAPI();
  const data = await response;
  const { token } = data;
  dispatch(tokenPlayerAPI(token));
  localStorage.setItem('token', token);
  console.log(token);
};
