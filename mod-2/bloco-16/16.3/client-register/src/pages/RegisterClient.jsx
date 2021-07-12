import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router';

import withStore from '../utils/withStore';
import { insertNewClient } from '../actions';
import { Layout, NoAuth } from '../components';


function RegisterClient({ insertNewClient, user }) {
  const history = useHistory();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    insertNewClient({ name, age, email });
    setName('');
    setAge('');
    setEmail('');
  }

  return(
    <Layout title="Cadastrar Cliente">
      <main>
        <h1>Cadastrar Cliente</h1>

        { user
            ? <form onSubmit={ handleSubmit }>
                <input
                  type="text"
                  placeholder="nome"
                  value={ name }
                  onChange={ ({ target }) => setName(target.value) }
                />

                <input
                  type="number"
                  placeholder="idade"
                  value={ age }
                  onChange={ ({ target }) => setAge(parseInt(target.value)) }
                />

                <input
                  type="email"
                  placeholder="email"
                  value={ email }
                  onChange={ ({ target }) => setEmail(target.value) }
                />

                <button type="submit">Cadastrar</button>
              </form>
            :  <NoAuth />}

          <section>
            <button onClick={ () => history.push('/clients') }>Ver todos os clientes</button>
          </section>
      </main>
    </Layout>
  );
}

export default withStore(RegisterClient, ['user' ], [insertNewClient]);