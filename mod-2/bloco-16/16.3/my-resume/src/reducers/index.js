import { combineReducers } from "redux";
import resume from "./resumeReducer";
import deepState from './deepStateReducer';

export const rootReducer = combineReducers({ resume, deepState });
