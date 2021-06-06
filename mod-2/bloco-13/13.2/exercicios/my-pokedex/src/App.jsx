import React from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import './App.css';
import POKEMON_DATA from './data.json';
import Pokedex from './components/Pokedex';
import Details from './components/Details';
import About from './components/About';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: {},
    }

    this.handleToggleFavorite = this.handleToggleFavorite.bind(this)
  }

  componentDidMount() {
    this.loadFavorites();
  }

  handleToggleFavorite(id) {
    this.setState((prev) => {
      const newState = {...prev};
      newState.favorites = {...newState.favorites, [id]: newState.favorites[id] ? false : true};
      this.saveFavorites(newState.favorites);
      return newState;
    });
  }

  loadFavorites() {
    if (!Storage || !localStorage) return;

    const retrievedFavorites = localStorage.getItem('favorites');

    if (!retrievedFavorites) return;

    try {
      const parsed = JSON.parse(retrievedFavorites);
      this.setState({
        favorites: parsed,
      });
    } catch (e) {
      alert('we couldnt load your favorite pokemon ):')
    }
  }

  saveFavorites(favorites) {
    if (!Storage || !localStorage) return;

    localStorage.setItem('favorites', JSON.stringify(favorites));
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <header>
            <h1>Dia 13.2 - Pokedex</h1>
            <nav>
              <Link to="/">Pokedex</Link>
              <Link to="/about">About</Link>
            </nav>
          </header>
          <Switch>
            <Route exact path="/" render={(props) => <Pokedex pokemonList={POKEMON_DATA} listStyle="single" favorites={this.state.favorites} handleToggleFavorite={this.handleToggleFavorite} {...props} />} />
  
            <Route path="/pokemons/:id" component={Details} />
  
            <Route path="/about" component={About} />
            
            <Route render={() => <main><h1>Four. Oh. Four.</h1><p>Parece que não tem nada por aqui...</p></main>} />
          </Switch>
          <footer>
            <p>Feito por <a target="_blank" rel="noreferrer" href="https://github.com/heyset">Matheus "Set" Inacio</a>, 2021.</p>
            <p>Todos os direitos de imagem e nome da marca Pokémon&copy; são de autoria da Nintendo&reg;.</p>
          </footer>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
