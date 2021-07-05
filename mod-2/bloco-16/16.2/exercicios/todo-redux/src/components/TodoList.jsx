import { useState, useRef, useEffect, useCallback } from 'react';
import { withStore } from '../utils/withStore';
import areRectsIntersecting from '../utils/areRectsIntersecting';
import TodoItem from './TodoItem';
import throttle from '../utils/throttle';
import './TodoList.css';

function TodoList({ todo }) {
  const { todo: todoList, completed } = todo;
  const [showingCompleted, setShowingCompleted] = useState(false);
  const [beingDragged, setBeingDragged] = useState(null);
  const [itemRefs, setItemRefs] = useState([]);
  const [itemRects, setItemRects] = useState([]);
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
        const newRelativePosition = {...previous.relativePosition};
        const newAbsolutePosition = {...previous.absolutePosition};

        newRelativePosition.top += e.movementY;
        newRelativePosition.left += e.movementX;

        newAbsolutePosition.top += e.movementY;
        newAbsolutePosition.left += e.movementX;

        console.log(newAbsolutePosition);

        itemRects.forEach((rect, index) => {
          if (areRectsIntersecting(rect, newAbsolutePosition)) {
            console.log(`estou abaixo do item de posição ${rect.order}`);
          };
        })

        return Object.assign({}, previous, { relativePosition: newRelativePosition, absolutePosition: newAbsolutePosition });
      });
    }, 16);

    function handleEndDrag() {
      setBeingDragged(null);
      console.log(itemRects);
    }

    document.addEventListener('mousemove', handleDragMove);
    document.addEventListener('mouseup', handleEndDrag); 

    return () => {
      document.removeEventListener('mouseup', handleEndDrag);
      document.removeEventListener('mousemove', handleDragMove);
    };

  }, [beingDragged]);
  
  const insertNewItemRef = useCallback((newRef, order) => {
    setItemRefs((itemRefs) => {
      newRef.order = order;
      const newItemRefArray = [...itemRefs, newRef];

      const newRectArray = newItemRefArray.map((ref) => {
        const newRect = ref.getBoundingClientRect();

        const rectObj = {
          left: newRect.left,
          top: newRect.top,
          height: newRect.height,
          width: newRect.width,
          order: ref.order,
        };

        rectObj.height = rectObj.height / 2;
        rectObj.top = rectObj.top + rectObj.height;

        return rectObj;
      });

      setItemRects(newRectArray);

      return newItemRefArray;
    });
  }, []);

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

    itemBeingDragged.absolutePosition = {
      top: itemRect.top,
      left: itemRect.left,
      width: itemRect.width,
      height: itemRect.height,
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
            ? todoList.map(({ content, id, order }) =>
              <TodoItem
                key={id}
                order={ order }
                content={content}
                id={id}
                dragFinalPosition={beingDragged?.id === id}
                handleStartDrag={handleStartDrag}
                insertNewItemRef={ insertNewItemRef }
              />)
            : completed.map(({ content, id }) => <TodoItem key={id} content={content} id={id} isCompleted />)
          }
        </ol>
      </section>
    </>
  )
}

export default withStore(TodoList, ['todo', 'completed']);
