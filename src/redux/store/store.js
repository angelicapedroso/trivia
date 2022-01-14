import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers/index';

const store = createStore(reducer, applyMiddleware(thunk));

if (window.Cypress) {
  window.store = store;
}

export default store;
