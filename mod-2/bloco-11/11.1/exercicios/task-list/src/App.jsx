import Task from './components/Task';
import './App.css';

const TASKS = ['aprender Rust', 'reprogramar a realidade em Rust', 'destruir o mundo', 'falhar porque Rust não tem bugs'];

function App() {
  return (
    <ol>
      {
        TASKS.map((taskText) => Task(taskText))
      }
    </ol>
  );
}

export default App;
