import createReducer from "../utils/createReducer";
import { v4 as uuid } from 'uuid';

const INITIAL_STATE = {
  currentOrder: 0,
  todo: [],
  completed: [],
};

const ACTIONS = {
  CREATE_NEW_TODO: ({ todo, completed, currentOrder }, { content }) => ({
    todo: [...todo, { id: uuid(), content, order: currentOrder, }, ],
    completed,
    currentOrder: currentOrder - 1,
  }),
  MARK_TODO_AS_COMPLETED: ({ todo, completed, currentOrder }, { id }) => {
    const index = todo.findIndex((todoItem) => todoItem.id === id);
    return {
      todo: todo.filter((todoItem) => todoItem.id !== id),
      completed: [...completed, todo[index]],
      currentOrder,
    };
  },
  MARK_TODO_AS_NOT_COMPLETED: ({ todo, completed, currentOrder, }, { id }) => {
    const index = completed.findIndex((completedItem) => completedItem.id === id);

    return {
      todo: [...todo, completed[index]],
      completed: completed.filter((completedItem) => completedItem.id !== id),
      currentOrder,
    };
  },
  DELETE_TODO: ({ todo, completed, currentOrder, }, { id, isCompleted }) => ({
    todo: isCompleted ? [...todo] : todo.filter((todoItem) => todoItem.id !== id),
    completed: isCompleted ? completed.filter((todoItem) => todoItem.id !== id) : [...completed],
    currentOrder,
  }),
  EDIT_TODO: ({ todo, completed, currentOrder, }, { id, content, order }) => ({
    todo: todo.map((todoItem) => {
      if (todoItem.id !== id) return todoItem;

      return { id, content, order };
    }),
    completed,
    currentOrder,
  }),
  REORDER_TODO: ({ todo, completed, currentOrder }, { previousOrder, newOrder }) => {
    if (previousOrder > newOrder) {
      return {
        todo: todo.map(({ id, content, order }) => {
          if (order === previousOrder) {
            return { id, content, order: newOrder };
          }

          if (order < newOrder || order > previousOrder) {
            return { id, content, order };
          }

          return { id, content, order: order + 1 };
        }),
        completed,
        currentOrder,
      }
    }

    return {
      todo: todo.map(({ id, content, order }) => {
        if (order === previousOrder) {
          return { id, content, order: newOrder };
        }

        if (order > newOrder || order < previousOrder) {
          return { id, content, order };
        }

        return { id, content, order: order - 1 };
      }),
      completed,
      currentOrder,
    };
  },
};

export default createReducer(INITIAL_STATE, ACTIONS);
