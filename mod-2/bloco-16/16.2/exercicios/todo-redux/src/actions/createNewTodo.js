const createNewTodo = ({ content }) => ({
  type: 'CREATE_NEW_TODO',
  payload: {
    content,
  },
});

export default createNewTodo;
