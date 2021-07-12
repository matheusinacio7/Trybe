import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router';

import withStore from '../utils/withStore';
import stateClone from '../utils/stateClone';
import { deleteClient } from '../actions';
import { NoAuth, Layout } from '../components';

function Clients({ clients, user, deleteClient }) {
  const [orderingAlphabetically, setOrderingAlphabetically] = useState(false);
  const history = useHistory();
  let sortedClients = stateClone(clients);

  if (orderingAlphabetically) {
    sortedClients = sortedClients.sort((a, b) => {
      if (a.name > b.name) return 1;
      if (b.name > a.name) return -1;
      return 0
    });
  }

  function handleToggleSorting() {
    setOrderingAlphabetically((previouslySorting) => !previouslySorting);
  }

  return(
    <Layout title="Clientes">
      <main>
        <h1>Clientes</h1>

        <section>
          {user.email
            ? <>
                <button onClick={() => history.push('/register-client')}>Cadastrar novo cliente</button>

                {sortedClients.length
                  ? <table>
                      <thead>
                        <tr>
                          <th onClick={ handleToggleSorting } style={{ textDecoration: 'underline' }}>Nome</th>
                          <th>Idade</th>
                          <th>Email</th>
                          <th>Deletar</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sortedClients.map(({ id, name, email, age }) => (
                          <tr key={ id }>
                            <td>{name}</td>
                            <td>{email}</td>
                            <td>{age}</td>
                            <td><button onClick={ () => deleteClient(id) }>X</button></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  : <p>Sem clientes cadastrados.</p>
                }
              </>
            : <NoAuth />
          }
        </section>
      </main>
    </Layout>
  );
}

export default withStore(Clients, ['clients', 'user'], [deleteClient]);