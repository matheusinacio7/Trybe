import { useState, useRef, useEffect } from 'react';
import { withStore } from '../utils/withStore';
import TodoItem from './TodoItem';
import throttle from '../utils/throttle';
import './TodoList.css';

function TodoList({ todo }) {
  const { todo: todoList, completed } = todo;
  const [showingCompleted, setShowingCompleted] = useState(false);
  const [beingDragged, setBeingDragged] = useState(null);
  const todoSectionElement = useRef(null);

  function handleToggleShowMode() {
    setShowingCompleted(previous => !previous);
  }

  const getParentTodoItem = (element) => element.parentElement.classList.contains('todo-item')
      ? element.parentElement
      : getParentTodoItem(element.parentElement);

  useEffect(() => {
    if (!beingDragged) return;

    const handleDragMove = throttle(function (e) {
      if (!beingDragged) return;

      setBeingDragged((previous) => {
        const newPosition = {...previous.relativePosition};

        newPosition.top += e.movementY;
        newPosition.left += e.movementX;

        return Object.assign({}, previous, { relativePosition: newPosition });
      });
    }, 16);

    function handleEndDrag() {
      setBeingDragged(null);
    }

    document.addEventListener('mousemove', handleDragMove);
    document.addEventListener('mouseup', handleEndDrag); 

    return () => {
      document.removeEventListener('mouseup', handleEndDrag);
      document.removeEventListener('mousemove', handleDragMove);
    };

  }, [beingDragged]);

  function handleStartDrag(id, e) {
    const { target } = e;

    const itemBeingDragged = todoList.find((todoItem) => todoItem.id === id);
    const originalItem = getParentTodoItem(target);
    const itemRect = originalItem.getBoundingClientRect();
    const todoSectionRect = todoSectionElement.current.getBoundingClientRect();

    const relativePosition = {
      top: itemRect.top - todoSectionRect.top,
      left: itemRect.left - todoSectionRect.left,
    };

    itemBeingDragged.relativePosition = relativePosition;

    setBeingDragged(itemBeingDragged);
  }

  return (
    <>
      <section
        className="todo-section"
        ref={ todoSectionElement }
      >
        { !beingDragged ? null : 
          <TodoItem
            id={ beingDragged.id }
            content={ beingDragged.content }
            relativePosition={ beingDragged.relativePosition }
            beingDragged
          />
        }
        <header className="todo-header">
          <div />
          <h1 className="h-section">Tarefas{showingCompleted ? ' Completas' : null}</h1>
          <button
            onClick={handleToggleShowMode}
          >Ver tarefas {showingCompleted ? 'a fazer' : 'completas'}</button>
        </header>
        <ol className="todo-list">
          {!showingCompleted
            ? todoList.map(({ content, id }) =>
              <TodoItem
                key={id}
                content={content}
                id={id}
                dragFinalPosition={beingDragged?.id === id}
                handleStartDrag={handleStartDrag}
              />)
            : completed.map(({ content, id }) => <TodoItem key={id} content={content} id={id} isCompleted />)
          }
        </ol>
      </section>
    </>
  )
}

export default withStore(TodoList, ['todo', 'completed']);
