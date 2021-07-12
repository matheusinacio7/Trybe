import createReducer from "../utils/createReducer";

const INITIAL_STATE = {
  email: '',
};

const ACTIONS = {
  LOGIN: (_, { email }) => ({ email }),
};

export default createReducer(INITIAL_STATE, ACTIONS);
