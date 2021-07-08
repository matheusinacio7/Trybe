import React from 'react';
import { Link } from 'react-router-dom';

import { Layout } from '../components';

function Home() {
  return (
    <Layout>
      <main>
        <h1>Registhor!!!</h1>
        <h2>Cadastre clientes neste site <em>belíssimo</em></h2>
        
        <p>Faça login <Link to="/login">aqui</Link></p>
      </main>
    </Layout>
  );
}

export default Home;
