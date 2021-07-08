import createReducer from '../utils/createReducer';

const INITIAL_STATE = [];

const ACTIONS = {
  INSERT_NEW_CLIENT: (state, { clientData }) => {
    state.push(clientData);

    return state;
  }
};

export default createReducer(INITIAL_STATE, ACTIONS);
