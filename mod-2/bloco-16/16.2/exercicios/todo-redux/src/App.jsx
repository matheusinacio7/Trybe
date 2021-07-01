import './App.css';

function App() {
  return (
    <>
      <header>
        <h1>Todo App - Redux</h1>
      </header>
      <main>
        <section>
          <h1>Adicionar nova tarefa</h1>
          <form>
            <input type="text" placeholder="O que você tem para fazer?"/>
            <button type="submit">Criar</button>
          </form>
        </section>

        <section>
          <h1>Tarefas</h1>
          <ol>
            <li>Comprar materia prima</li>
            <li>Fazer drogas</li>
            <li>Vender drogas</li>
          </ol>
        </section>
      </main>
      <footer>
        <p>Feito por <a href="https://github.com/heyset">Matheus "Set" Inacio</a>, 2021.</p>
      </footer>
    </>
  );
}

export default App;
