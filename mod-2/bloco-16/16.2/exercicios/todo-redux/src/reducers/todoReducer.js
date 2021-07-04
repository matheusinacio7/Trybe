import createReducer from "../utils/createReducer";
import { v4 as uuid } from 'uuid';

const INITIAL_STATE = {
  todo: [],
  completed: [],
}

const ACTIONS = {
  CREATE_NEW_TODO: ({ todo, completed }, { content }) => ({ todo: [...todo, { id: uuid(), content, }], completed,}),
  MARK_TODO_AS_COMPLETED: ({ todo, completed }, { id }) => {
    const index = todo.findIndex((todoItem) => todoItem.id === id);
    return {
      todo: todo.filter((todoItem) => todoItem.id !== id),
      completed: [...completed, todo[index]],
    };
  },
  DELETE_TODO: ({ todo, completed }, { id, isCompleted }) => ({
    todo: isCompleted ? [...todo] : todo.filter((todoItem) => todoItem.id !== id),
    completed: isCompleted ? completed.filter((todoItem) => todoItem.id !== id) : [...completed],
  }),
};

export default createReducer(INITIAL_STATE, ACTIONS);
