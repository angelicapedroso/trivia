import fetchTokenAPI from '../../services/fetchAPI';

export const TOKEN_PLAYER_API = 'TOKEN_PLAYER_API';

export const tokenPlayerAPI = (token) => ({
  type: TOKEN_PLAYER_API,
  payload: token,
});

export const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS';
export const requestQuestions = (questions) => ({
  type: REQUEST_QUESTIONS,
  questions,
});

export const fetchQuestions = (token) => (dispatch) => {
  fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
    .then((response) => response.json())
    .then((question) => dispatch(requestQuestions(question)));
};

export const getTokenPlayer = () => async (dispatch) => {
  const response = await fetchTokenAPI();
  const data = await response;
  const { token } = data;
  dispatch(tokenPlayerAPI(token));
  const localToken = localStorage.setItem('token', token);
  if (!localToken) {
    dispatch(fetchQuestions(token));
  }
};

export const ADD_USER = 'ADD_USER';
export const addUser = (user) => ({ type: ADD_USER, user });

export const addPoint = (score) => ({ type: 'ADD_POINT', score });
