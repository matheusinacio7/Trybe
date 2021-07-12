import { combineReducers } from 'redux'
import todo from "./todoReducer";

export const rootReducer = combineReducers({
  todo,
});
