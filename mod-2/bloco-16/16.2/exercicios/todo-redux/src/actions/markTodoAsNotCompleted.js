const markTodoAsNotCompleted = ({ id }) => ({
  type: 'MARK_TODO_AS_NOT_COMPLETED',
  payload: {
    id,
  },
});

export default markTodoAsNotCompleted;
