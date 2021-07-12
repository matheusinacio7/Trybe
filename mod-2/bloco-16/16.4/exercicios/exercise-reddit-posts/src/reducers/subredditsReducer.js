import createReducer from '../utils/createReducer';

const INITIAL_STATE = {
  isLoading: false,
  subreddits: {},
};

const ACTIONS = {
  REQUEST_POSTS: (state) => {
    state.isLoading = true;
    return state;
  },
  UPDATE_SUBREDDIT: (state, { r, posts, error }) => {
    state.subreddits[r] = state.subreddits[r] ?? {};
    state.isLoading = false;

    if (error) {
      state.subreddits[r].error = error;
      return state;
    }

    state.subreddits[r].posts = posts;
    state.subreddits[r].lastUpdated = new Date();

    return state;
  },
}

export default createReducer(INITIAL_STATE, ACTIONS);
