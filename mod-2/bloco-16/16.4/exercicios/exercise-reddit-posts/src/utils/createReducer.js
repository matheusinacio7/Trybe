import clone from './stateClone';

const createReducer = (initialState, actions) => (state = initialState, { type, payload }) => actions[type] ? actions[type](clone(state), payload) : state;

export default createReducer;