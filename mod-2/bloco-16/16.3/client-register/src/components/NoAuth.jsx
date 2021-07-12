import React from 'react';
import { Link } from 'react-router-dom';

function NoAuth() {
  return (
    <section>
      <p>Sem autorização.</p>
      <p>Você se esqueceu de <Link to="/login">fazer login?</Link></p>
    </section>
  );
}

export default NoAuth;