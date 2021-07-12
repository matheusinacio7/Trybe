import createReducer from "../utils/createReducer";
import stateClone from "../utils/stateClone";

const INITIAL_STATE = {
  person: {
    name: {
      first: '',
      last: '',
    },
    dob: {
      age: null,
      date: null,
    }
  },
  history: [],
};

const ACTIONS = {
  CHANGE_FIRST_NAME: (state, { firstName }) => {
    const { history, person } = state;
    history.push(stateClone(state));

    person.name.first = firstName;

    return state;
  }
};

export default createReducer(INITIAL_STATE, ACTIONS);
