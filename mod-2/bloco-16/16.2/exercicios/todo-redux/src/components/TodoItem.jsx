import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEllipsisV, faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';
import { markTodoAsCompleted, deleteTodo, editTodo } from '../actions';
import { useStore } from '../hooks/useStore';
import { useState, useRef } from 'react';
import './TodoItem.css';

function TodoItem({ content, id, markTodoAsCompleted, deleteTodo, editTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentContent, setCurrentContent] = useState(content);
  const contentField = useRef(null);

  function handleDelete() {
    deleteTodo({ id, isCompleted: false });
  }

  function handleMarkAsCompleted() {
    markTodoAsCompleted({ id });
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      toggleEditing();
      return;
    }
  }

  function toggleEditing() {
    setIsEditing((previouslyEditing) => {
      if (!previouslyEditing) {
        contentField.current.focus();
        return true;
      }

      editTodo({ id, content: currentContent })
      contentField.current.blur();
      return false;
    });
  }

  return (
    <li className="todo-item">
      <section className="todo-item__grab-section">
        <FontAwesomeIcon icon={ faEllipsisV } className="todo-item__icon todo-item__drag" />
      </section>
      <section className="todo-item__content">
        <input
          ref={ contentField }
          type="text"
          value={ currentContent }
          className="todo-item__content__field"
          onChange={ ({ target }) => setCurrentContent(target.value) }
          onKeyDown={ handleKeyDown }
          readOnly={ !isEditing }
        />
      </section>
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
            <FontAwesomeIcon
              icon={ faEdit }
              className="todo-item__icon"
              onClick={ toggleEditing }
            />
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
export default useStore(TodoItem, ['todo'], [markTodoAsCompleted, deleteTodo, editTodo]);
