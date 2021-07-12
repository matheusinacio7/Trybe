const insertNewClient = (clientData) => ({
  type: 'INSERT_NEW_CLIENT',
  payload: { clientData },
});

export default insertNewClient;
