const createReducer = (initialState, actions) => (state = initialState, { type, payload }) => actions[type] ? actions[type](state, payload) : state;

export default createReducer;