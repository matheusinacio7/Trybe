const createReducer = (initialState, actions) => (state = initialState, { type, payload }) => actions[type] ? actions[type](payload) : state;

export default createReducer;