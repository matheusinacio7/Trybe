import { combineReducers } from "redux";

import client from "./clientReducer";

const rootReducer = combineReducers({ client });

export default rootReducer;
