const editTodo = ({ id, content }) => ({
  type: 'EDIT_TODO',
  payload: {
    id,
    content,
  },
});

export default editTodo;
