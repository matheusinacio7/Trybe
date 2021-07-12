import { combineReducers } from "redux";

import subreddits from "./subredditsReducer";

const rootReducer = combineReducers({ subreddits });

export default rootReducer;
