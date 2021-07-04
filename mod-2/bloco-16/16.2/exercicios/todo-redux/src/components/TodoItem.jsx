import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEllipsisV, faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';
import { markTodoAsCompleted, deleteTodo } from '../actions';
import { useStore } from '../hooks/useStore';
import './TodoItem.css';

function TodoItem({ content, id, markTodoAsCompleted, deleteTodo }) {
  function handleDelete() {
    deleteTodo({ id, isCompleted: false });
  }

  function handleMarkAsCompleted() {
    markTodoAsCompleted({ id });
  }

  return (
    <li className="todo-item">
      <section className="todo-item__grab-section">
        <FontAwesomeIcon icon={ faEllipsisV } className="todo-item__icon todo-item__drag" />
      </section>
      <section className="todo-item__content">{ content }</section>
      <section className="todo-item__controls">
        <div className="todo-item__controls__complete">
          <FontAwesomeIcon
            icon={ faCheck }
            className="todo-item__icon todo-item__complete"
            onClick={ handleMarkAsCompleted }  
          />
        </div>
        <div className="todo-item__controls__separator" />
        <div className="todo-item__controls__modify">
          <div>
            <FontAwesomeIcon icon={ faEdit } className="todo-item__icon" />
          </div>
          <div>
            <FontAwesomeIcon
              icon={ faTimes }
              className="todo-item__icon"
              onClick={ handleDelete }
            />
          </div>
        </div>
      </section>
    </li>
  );
}

// eslint-disable-next-line react-hooks/rules-of-hooks
export default useStore(TodoItem, ['todo'], [markTodoAsCompleted, deleteTodo]);
