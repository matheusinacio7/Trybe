import TodoItem from './TodoItem';

export default function TodoList() {
  return (
    <section>
      <h1>Tarefas</h1>
      <ol>
        <TodoItem />
        <TodoItem />
        <TodoItem />
      </ol>
    </section>
  )
}
