const deleteTodo = ({ id, isCompleted }) => ({
  type: 'DELETE_TODO',
  payload: {
    id,
    isCompleted,
  },
});

export default deleteTodo;
