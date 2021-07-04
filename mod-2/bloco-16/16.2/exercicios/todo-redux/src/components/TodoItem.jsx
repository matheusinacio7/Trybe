import './TodoItem.css';

export default function TodoItem({ content }) {
  return (
    <li className="todo-item">
      <div>{ content }</div>
      <div>

      </div>
    </li>
  );
}