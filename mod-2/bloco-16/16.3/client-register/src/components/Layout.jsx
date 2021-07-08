import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function Layout({ children, title }) {
  useEffect(() => {
    document.title = title ? `${title} | Registhor` : 'Registhor';
  }, [title]);

  return (
    <>
      <header> <Link to="/">Registhor!</Link> </header>
      { children }
      <footer> App aleatorio </footer>
    </>
  );
}

export default Layout;
