import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router';

import withStore from '../utils/withStore';
import { login } from '../actions';

import { Layout } from '../components';

function Login({ login }) {
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    login({ email, password });
    history.push('/clients');
  }

  return(
    <Layout title="Login">
      <main>
        <h1>Login</h1>

        <form onSubmit={ handleSubmit }>
          <input
            type="email"
            value={ email }
            onChange={ ({ target }) => setEmail(target.value) }
            placeholder="email"
          />
          <input
            type="password"
            value={ password }
            onChange={ ({ target }) => setPassword(target.value) }
            placeholder="senha"
          />

          <button type="submit">Entrar</button>
        </form>
      </main>
    </Layout>
  );
}

export default withStore(Login, null, [login]);