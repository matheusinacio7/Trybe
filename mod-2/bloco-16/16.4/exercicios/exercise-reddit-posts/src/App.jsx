import React from 'react';
import { SearchForm, SearchResults } from './components';

function App() {
  return (
    <>
      <header>
        <h1>Subreddit Crawler 👀</h1>
      </header>
      <main>
        <SearchForm />
        <SearchResults />
      </main>
    </>
  );
}

export default App;
