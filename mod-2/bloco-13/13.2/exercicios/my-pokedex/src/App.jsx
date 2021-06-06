import Pokedex from './components/Pokedex'
import './App.css';
import POKEMON_DATA from './data.json';

function App() {
  return (
    <div>
      <header>
        <h1>Dia 13.2 - Pokedex</h1>
      </header>
      <Pokedex pokemonList={POKEMON_DATA} style="single" />
      <footer>
        <p>Feito por <a target="_blank" href="https://github.com/heyset">Matheus "Set" Inacio</a>, 2021.</p>
        <p>Todos os direitos de imagem e nome da marca Pokémon&copy; são de autoria da Nintendo&reg;.</p>
      </footer>
    </div>
  );
}

export default App;
