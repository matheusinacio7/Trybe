const markTodoAsCompleted = ({ id }) => ({
  type: 'MARK_TODO_AS_COMPLETED',
  payload: {
    id,
  },
});

export default markTodoAsCompleted;