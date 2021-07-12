const defaultState = {
  incrementDelta: 1,
  decrementDelta: 1,
  count: 0,
  absoluteCount: 0,
  deltaHistory: [],
}

const counterReducer = (state = defaultState, action) => {
  const ACTIONS = {
    CHANGE_INCREMENT_DELTA: (state) => Object.assign({}, state, { incrementDelta: parseInt(action.delta) }),
    CHANGE_DECREMENT_DELTA: (state) => Object.assign({}, state, { decrementDelta: parseInt(action.delta) }),
    UPDATE_COUNT: (state) => {
      let delta;

      if (action.shouldIncrement) {
        delta = state.incrementDelta;
      } else {
        delta = state.decrementDelta * -1;
      }

      return Object.assign(
        {},
        state,
        {
          count: state.count + delta,
          absoluteCount: state.absoluteCount + 1,
          deltaHistory: [...state.deltaHistory, delta],
        });
    },
    UNDO: (state) => {
      if (!state.deltaHistory.length) {
        return state;
      }

      const newDeltaHistory = [...state.deltaHistory];
      const delta = newDeltaHistory.pop();
      
      return Object.assign(
        {},
        state,
        {
          deltaHistory: newDeltaHistory,
          count: state.count - delta,
          absoluteCount: state.absoluteCount - 1,
        });
    },
  }

  if (ACTIONS[action.type]) {
    return ACTIONS[action.type](state);
  }

  return state;
}

const store = Redux.createStore(counterReducer);

const htmlElements = {
  count: document.getElementById('count'),
  absoluteCount: document.getElementById('absolute-count'),
  incrementButton: document.getElementById('increment-button'),
  incrementInput: document.getElementById('increment-input'),
  incrementCount: document.getElementById('increment-count'),
  decrementButton: document.getElementById('decrement-button'),
  decrementInput: document.getElementById('decrement-input'),
  decrementCount: document.getElementById('decrement-count'),
  undoButton: document.getElementById('undo-button'),
};

htmlElements.incrementButton.addEventListener('click', () => {
  store.dispatch({ type: 'UPDATE_COUNT', shouldIncrement: true });
});

htmlElements.decrementButton.addEventListener('click', () => {
  store.dispatch({ type: 'UPDATE_COUNT', shouldIncrement: false });
});

htmlElements.incrementInput.addEventListener('change', ({ target }) => {
  store.dispatch({ type: 'CHANGE_INCREMENT_DELTA', delta:  target.value });
});

htmlElements.decrementInput.addEventListener('change', ({ target }) => {
  store.dispatch({ type: 'CHANGE_DECREMENT_DELTA', delta:  target.value });
});

htmlElements.undoButton.addEventListener('click', () => {
  store.dispatch({ type: 'UNDO' });
});

store.subscribe(() => {
  const {
    count,
    absoluteCount,
    incrementDelta,
    decrementDelta,
  } = store.getState();

  htmlElements.count.innerText = count;
  htmlElements.absoluteCount.innerText = absoluteCount;
  htmlElements.incrementInput.value = incrementDelta;
  htmlElements.decrementInput.value = decrementDelta;
  htmlElements.incrementCount.innerText = incrementDelta;
  htmlElements.decrementCount.innerText = decrementDelta;
});
