import createReducer from '../utils/createReducer';

const INITIAL_STATE = {
  clients: [],
};

const ACTIONS = {
  INSERT_NEW_CLIENT: (state, { clientData }) => {
    state.clients.push(clientData);

    return state;
  }
};

export default createReducer(INITIAL_STATE, ACTIONS);
