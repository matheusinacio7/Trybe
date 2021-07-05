/* eslint-disable react-hooks/rules-of-hooks */

import { useState, useRef } from 'react';
import { useStore } from '../hooks/useStore';
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
  
  function handleDragMove (e) {
    console.log(beingDragged);
    if (!beingDragged) return;
    
    console.log(e);
    console.log(beingDragged.relativePosition);
  };
  
  function handleEndDrag() {
    console.log(beingDragged);
    console.log('ending');
    setBeingDragged(null);
    document.removeEventListener('mouseup', handleEndDrag);
    document.removeEventListener('mousemove', handleDragMove);
  }

  function handleStartDrag(id, target) {
    setBeingDragged(() => {
      const itemBeingDragged = todoList.find((todoItem) => todoItem.id === id);
      const originalItem = getParentTodoItem(target);
      const itemRect = originalItem.getBoundingClientRect();
      const todoSectionRect = todoSectionElement.current.getBoundingClientRect();

      const relativePosition = {
        top: itemRect.top - todoSectionRect.top - 20,
        left: itemRect.left - todoSectionRect.left - 20,
      };

      itemBeingDragged.relativePosition = relativePosition;

      return itemBeingDragged;
    });

    document.addEventListener('mousemove', handleDragMove);
    document.addEventListener('mouseup', handleEndDrag);  
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

export default useStore(TodoList, ['todo', 'completed']);
