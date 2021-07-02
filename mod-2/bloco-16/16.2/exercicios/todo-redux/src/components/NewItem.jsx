/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useRef } from 'react';

import { useStore } from '../hooks/useStore';
import { createNewTodo } from '../actions';

function NewItem({ createNewTodo }) {
  const [input, setInput] = useState('');
  const inputField = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();

    createNewTodo({ content: input });

    setInput('');
    inputField.current.focus();
  }

  return (
    <section onSubmit={ handleSubmit } >
      <h1>Adicionar nova tarefa</h1>
      <form >
        <input
          type="text" 
          placeholder="O que você tem para fazer?"
          value={ input }
          onChange={ ({ target }) => setInput(target.value) }
          ref={ inputField }
        />
        <button type="submit">Criar</button>
      </form>
    </section>
  );
}

export default useStore(NewItem, ['todo'], [createNewTodo]);
