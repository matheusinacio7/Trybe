import createReducer from "../utils/createReducer";

const INITIAL_STATE = {
  currentInfo: {},
  hasInfo: '',
};

const ACTIONS = {
  UPDATE_INFO: (_, { info }) => ({ currentInfo: info, hasInfo: true }),
  RESET_INFO: () => INITIAL_STATE,
};

export default createReducer(INITIAL_STATE, ACTIONS);
