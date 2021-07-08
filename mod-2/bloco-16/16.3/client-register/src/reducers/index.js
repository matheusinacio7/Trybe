import { combineReducers } from "redux";

import clients from "./clientsReducer";
import user from './userReducer';

const rootReducer = combineReducers({ clients, user });

export default rootReducer;
