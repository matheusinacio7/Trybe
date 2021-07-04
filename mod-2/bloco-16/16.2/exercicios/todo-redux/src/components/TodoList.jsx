/* eslint-disable react-hooks/rules-of-hooks */

import { useStore } from '../hooks/useStore';
import TodoItem from './TodoItem';
import './TodoList.css';

function TodoList({ todo }) {
  const { todo: todoList } = todo;

  return (
    <section className="todo-section">
      <h1 className="h-section">Tarefas</h1>
      <ol className="todo-list">
        { todoList.map(({ content, id }) => <TodoItem key={ id } content={ content } id={ id } />) }
      </ol>
    </section>
  )
}

export default useStore(TodoList, ['todo']);
