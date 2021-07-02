/* eslint-disable react-hooks/rules-of-hooks */

import { useStore } from '../hooks/useStore';
import TodoItem from './TodoItem';

function TodoList({ todo }) {
  const { todo: todoList } = todo;

  return (
    <section>
      <h1>Tarefas</h1>
      <ol>
        { todoList.map(({ content }) => <TodoItem content={ content } />) }
      </ol>
    </section>
  )
}

export default useStore(TodoList, ['todo']);
