import './App.css';
import NewItem from './components/NewItem';
import TodoList from './components/TodoList';

function App() {
  return (
    <>
      <header>
        <h1>Todo App - Redux</h1>
      </header>
      <main>
        <NewItem />
        <TodoList />
      </main>
      <footer>
        <p>Feito por <a href="https://github.com/heyset">Matheus "Set" Inacio</a>, 2021.</p>
      </footer>
    </>
  );
}

export default App;
