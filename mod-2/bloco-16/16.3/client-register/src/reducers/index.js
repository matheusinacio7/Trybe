import { combineReducers } from "redux";

import client from "./clientReducer";
import user from './userReducer';

const rootReducer = combineReducers({ client, user });

export default rootReducer;
