import { Provider } from 'react-redux';

import { store } from './utils/withStore';

import './App.css';
import NewItem from './components/NewItem';
import TodoList from './components/TodoList';

function App() {
  return (
    <Provider store={ store }>
      <header>
        <h1 className="h-main">Todo App - Redux</h1>
      </header>
        <main>
          <NewItem />
          <TodoList />
        </main>
      <footer>
        <p>Feito por <a href="https://github.com/heyset">Matheus "Set" Inacio</a>, 2021.</p>
      </footer>
    </Provider>
  );
}

export default App;
