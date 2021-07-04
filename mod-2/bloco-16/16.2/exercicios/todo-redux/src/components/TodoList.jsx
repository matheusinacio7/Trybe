/* eslint-disable react-hooks/rules-of-hooks */

import { useState } from 'react';
import { useStore } from '../hooks/useStore';
import TodoItem from './TodoItem';
import './TodoList.css';

function TodoList({ todo }) {
  const { todo: todoList, completed } = todo;
  const [showingCompleted, setShowingCompleted] = useState(false);

  function handleToggleShowMode() {
    setShowingCompleted(previous => !previous);
  }

  return (
    <section className="todo-section">
      <header className="todo-header">
        <div />
        <h1 className="h-section">Tarefas{ showingCompleted ? ' Completas' : null }</h1>
        <button
          onClick={ handleToggleShowMode }
        >Ver tarefas { showingCompleted ? 'a fazer' : 'completas' }</button>
      </header>
      <ol className="todo-list">
        { !showingCompleted
          ? todoList.map(({ content, id }) => <TodoItem key={ id } content={ content } id={ id } />)
          : completed.map(({ content, id }) => <TodoItem key={ id } content={ content } id={ id } isCompleted />)
        }
      </ol>
    </section>
  )
}

export default useStore(TodoList, ['todo', 'completed']);
