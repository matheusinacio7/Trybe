import React from 'react';
import { useEffect } from 'react';

function Layout({ children, title }) {
  useEffect(() => {
    document.title = title ? `${title} | Registhor` : 'Registhor';
  }, [title]);

  return (
    <>
      <header> Cadastro de Clientes </header>
      { children }
      <footer> App aleatorio </footer>
    </>
  );
}

export default Layout;
