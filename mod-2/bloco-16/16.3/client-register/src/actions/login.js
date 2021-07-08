const login = ({ email, password }) => ({
  type: 'LOGIN',
  payload: { email, password },
});

export default login;
