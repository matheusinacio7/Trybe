import createReducer from "../utils/createReducer";
import { v4 as uuid } from 'uuid';

const INITIAL_STATE = {
  todo: [],
  completed: [],
}

const ACTIONS = {
  CREATE_NEW_TODO: ({ todo, completed }, { content }) => ({
    todo: [{ id: uuid(), content, }, ...todo,],
    completed,
  }),
  MARK_TODO_AS_COMPLETED: ({ todo, completed }, { id }) => {
    const index = todo.findIndex((todoItem) => todoItem.id === id);
    return {
      todo: todo.filter((todoItem) => todoItem.id !== id),
      completed: [...completed, todo[index]],
    };
  },
  MARK_TODO_AS_NOT_COMPLETED: ({ todo, completed }, { id }) => {
    const index = completed.findIndex((completedItem) => completedItem.id === id);

    return {
      todo: [...todo, completed[index]],
      completed: completed.filter((completedItem) => completedItem.id !== id),
    };
  },
  DELETE_TODO: ({ todo, completed }, { id, isCompleted }) => ({
    todo: isCompleted ? [...todo] : todo.filter((todoItem) => todoItem.id !== id),
    completed: isCompleted ? completed.filter((todoItem) => todoItem.id !== id) : [...completed],
  }),
  EDIT_TODO: ({ todo, completed }, { id, content }) => ({
    todo: [...todo].map((todoItem) => {
      if (todoItem.id !== id) return todoItem;

      return { id, content };
    }),
    completed,
  }),
};

export default createReducer(INITIAL_STATE, ACTIONS);
