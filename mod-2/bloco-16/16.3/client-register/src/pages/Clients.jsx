import React from 'react';
import { useHistory } from 'react-router';

import withStore from '../utils/withStore';
import { NoAuth, Layout } from '../components';

function Clients({ clients, user }) {
  const history = useHistory();

  return(
    <Layout title="Clientes">
      <main>
        <h1>Clientes</h1>

        { user.email 
            ? <section>
                <button onClick={ () => history.push('/register-client') }>Cadastrar novo cliente</button>

                { clients.length
                    ? <NoAuth />
                    : <p>Sem clientes cadastrados.</p>
                }
              </section>
            : null
        }
      </main>
    </Layout>
  );
}

export default withStore(Clients, ['clients', 'user'])