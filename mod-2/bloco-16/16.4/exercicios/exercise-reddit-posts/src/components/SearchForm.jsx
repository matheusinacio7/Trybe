import React from 'react';
import { useState, useRef } from 'react';

import withStore from '../utils/withStore';

import { fetchSubreddit } from '../actions';

function SearchForm({ fetchSubreddit }) {
  const [inputFieldValue, setInputFieldValue] = useState('');
  const inputField = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();

    fetchSubreddit(inputFieldValue);
    setInputFieldValue('');
    inputField.current.focus();
  }

  return(
    <form onSubmit={ handleSubmit }>
      <input
        type="text"
        placeholder="Digite o subreddit. Sugestão: todayilearned"
        value={ inputFieldValue }
        onChange={ ({ target }) => setInputFieldValue(target.value) }
        ref={ inputField }
      />

      <button type="submit">
        Pesquisar!
      </button>
    </form>
  );
}

export default withStore(SearchForm, null, [fetchSubreddit]);
