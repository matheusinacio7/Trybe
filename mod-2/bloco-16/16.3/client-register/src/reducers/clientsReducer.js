import { v4 as uuid } from 'uuid';
import createReducer from '../utils/createReducer';

const INITIAL_STATE = [];

const ACTIONS = {
  INSERT_NEW_CLIENT: (state, { clientData }) => {
    clientData.id = uuid();
    state.push(clientData);

    return state;
  },

  DELETE_CLIENT: (_, { id }, state) => state.filter((client) => client.id !== id),
};

export default createReducer(INITIAL_STATE, ACTIONS);
