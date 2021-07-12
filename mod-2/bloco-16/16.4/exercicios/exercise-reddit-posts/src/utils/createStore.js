import { applyMiddleware, createStore as reduxCreateStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const createStore = (rootReducer) =>
  reduxCreateStore(
    rootReducer,
    composeWithDevTools(
      applyMiddleware(thunk)
    ));

export default createStore;
