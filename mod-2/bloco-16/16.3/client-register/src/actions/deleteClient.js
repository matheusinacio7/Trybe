const deleteClient = (id) => ({
  type: 'DELETE_CLIENT',
  payload: { id },
});

export default deleteClient;
