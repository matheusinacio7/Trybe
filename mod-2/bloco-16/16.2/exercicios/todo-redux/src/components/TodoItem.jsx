import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEllipsisV, faTimes, faEdit, faRedo } from '@fortawesome/free-solid-svg-icons';
import { markTodoAsCompleted, markTodoAsNotCompleted, deleteTodo, editTodo } from '../actions';
import { withStore } from '../utils/withStore';
import { useState, useRef, useEffect } from 'react';
import './TodoItem.css';

function TodoItem({
    content,
    id,
    isCompleted,
    handleStartDrag,
    dragFinalPosition,
    beingDragged,
    insertNewItemRef,
    relativePosition,
    markTodoAsCompleted,
    markTodoAsNotCompleted,
    deleteTodo,
    editTodo,
  }) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentContent, setCurrentContent] = useState(content);
  const contentField = useRef(null);
  const todoItemRef = useRef(null);

  function handleDelete() {
    deleteTodo({ id, isCompleted });
  }

  function handleToggleCompleted() {
    isCompleted 
      ? markTodoAsNotCompleted({ id })
      : markTodoAsCompleted({ id });
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      toggleEditing();
      return;
    }
  }
  
  useEffect(() => {
    if (beingDragged) return;
    insertNewItemRef(todoItemRef.current);
  }, [insertNewItemRef, beingDragged]);

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
    <li
      className={`todo-item${dragFinalPosition ? ' drag-final-position' : ''}${beingDragged ? ' being-dragged' : ''}`}
      style={{
        top: beingDragged ? relativePosition.top : null,
        left: beingDragged ? relativePosition.left : null,
      }}
      ref={ todoItemRef }
    >
      {
        dragFinalPosition
        ? <p className="todo-item__status-text">O item vai ocupar esta posição.</p>
        :
          <>
            <section
              className="todo-item__grab-section"
              onMouseDown={ (e) => handleStartDrag(id, e) }
            >
              {isCompleted ? null :
                <FontAwesomeIcon
                  icon={faEllipsisV}
                  className="todo-item__icon todo-item__drag"
                />}
            </section>
            <section className="todo-item__content">
              <input
                ref={contentField}
                type="text"
                value={currentContent}
                className="todo-item__content__field"
                onChange={({ target }) => setCurrentContent(target.value)}
                onKeyDown={handleKeyDown}
                readOnly={!isEditing}
              />
            </section>
            <section className="todo-item__controls">
              <div className="todo-item__controls__complete">
                <FontAwesomeIcon
                  icon={!isCompleted ? faCheck : faRedo}
                  className="todo-item__icon todo-item__complete"
                  onClick={handleToggleCompleted}
                />
              </div>
              <div className="todo-item__controls__separator" />
              <div className="todo-item__controls__modify">
                {
                  isCompleted ? null :
                    <div>
                      <FontAwesomeIcon
                        icon={faEdit}
                        className="todo-item__icon"
                        onClick={toggleEditing}
                      />
                    </div>}
                <div>
                  <FontAwesomeIcon
                    icon={faTimes}
                    className="todo-item__icon"
                    onClick={handleDelete}
                  />
                </div>
              </div>
            </section>
          </>}
    </li>
  );
}

export default withStore(TodoItem, ['todo'], [markTodoAsCompleted, markTodoAsNotCompleted, deleteTodo, editTodo]);
