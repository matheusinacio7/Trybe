import createReducer from "../utils/createReducer";
import { v4 as uuid } from 'uuid';

const INITIAL_STATE = {
  todo: [],
  completed: [],
}

const ACTIONS = {
  CREATE_NEW_TODO: ({ todo, completed }, { content }) => ({ todo: [...todo, { id: uuid(), content, }], completed,}),
};

export default createReducer(INITIAL_STATE, ACTIONS);
