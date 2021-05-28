const POKEMONS = [
  {
      id: 25,
      name: "Pikachu",
      type: 'Electric',
      averageWeight: {
          value: 6.0,
          measurementUnit: "kg"
      },
      image: "https:\/\/cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png",
      moreInfo: "https:\/\/bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)"
  },
  {
      id: 4,
      name: "Charmander",
      type: 'Fire',
      averageWeight: {
          value: 8.5,
          measurementUnit: "kg"
      },
      image: "https:\/\/cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png",
      moreInfo: "https:\/\/bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)"
  },
  {
      id: 10,
      name: "Caterpie",
      type: 'Bug',
      averageWeight: {
          value: 2.9,
          measurementUnit: "kg"
      },
      image: "https:\/\/cdn2.bulbagarden.net/upload/8/83/Spr_5b_010.png",
      moreInfo: "https:\/\/bulbapedia.bulbagarden.net/wiki/Caterpie_(Pok%C3%A9mon)"
  },
  {
      id: 23,
      name: "Ekans",
      type: 'Poison',
      averageWeight: {
          value: 6.9,
          measurementUnit: "kg"
      },
      image: "https:\/\/cdn2.bulbagarden.net/upload/1/18/Spr_5b_023.png",
      moreInfo: "https:\/\/bulbapedia.bulbagarden.net/wiki/Ekans_(Pok%C3%A9mon)"
  },
  {
      id: 65,
      name: "Alakazam",
      type: 'Psychic',
      averageWeight: {
          value: 48.0,
          measurementUnit: "kg"
      },
      image: "https:\/\/cdn2.bulbagarden.net/upload/8/88/Spr_5b_065_m.png",
      moreInfo: "https:\/\/bulbapedia.bulbagarden.net/wiki/Alakazam_(Pok%C3%A9mon)"
  },
  {
      id: 151,
      name: "Mew",
      type: 'Psychic',
      averageWeight: {
          value: 4.0,
          measurementUnit: "kg"
      },
      image: "https:\/\/cdn2.bulbagarden.net/upload/4/43/Spr_5b_151.png",
      moreInfo: "https:\/\/bulbapedia.bulbagarden.net/wiki/Mew_(Pok%C3%A9mon)"
  },
  {
      id: 78,
      name: "Rapidash",
      type: 'Fire',
      averageWeight: {
          value: 95.0,
          measurementUnit: "kg"
      },
      image: "https:\/\/cdn2.bulbagarden.net/upload/5/58/Spr_5b_078.png",
      moreInfo: "https:\/\/bulbapedia.bulbagarden.net/wiki/Rapidash_(Pok%C3%A9mon)"
  },
  {
      id: 143,
      name: "Snorlax",
      type: 'Normal',
      averageWeight: {
          value: 460.0,
          measurementUnit: "kg"
      },
      image: "https:\/\/cdn2.bulbagarden.net/upload/4/40/Spr_5b_143.png",
      moreInfo: "https:\/\/bulbapedia.bulbagarden.net/wiki/Snorlax_(Pok%C3%A9mon)"
  },
  {
      id: 148,
      name: "Dragonair",
      type: 'Dragon',
      averageWeight: {
          value: 16.5,
          measurementUnit: "kg"
      },
      image: "https:\/\/cdn2.bulbagarden.net/upload/2/2c/Spr_5b_148.png",
      moreInfo: "https:\/\/bulbapedia.bulbagarden.net/wiki/Dragonair_(Pok%C3%A9mon)"
  }
];

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className="app">{this.props.children}</div>
  }
}

class Pokemon extends React.Component {
  render() {
    const { id, name, type, averageWeight, image, moreInfo } = this.props.pokemonData;
    
    return (
      <li className="pokemon">
        <picture className="pokemon__picture" >
          <img src={image} alt={`Pokémon n${id}: ${name}`} />
        </picture>
        <h2 className="pokemon__number">#{id.toString(10).padStart(3, '0')}</h2>
        <h1 className="pokemon__name">{name}</h1>
        <p className="pokemon__details">
          <span>Type: {type}</span>
          <span>Avg. Weight: {averageWeight.value} {averageWeight.measurementUnit}</span>
          <span><a target="_blank" href={moreInfo}>Read more</a></span>
        </p>
      </li>
    )
  }
}

class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button onClick={this.props.onClick} disabled={this.props.disabled}>
        {this.props.children}
      </button>
    );
  }
}

class Controls extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section>
        <div>
          <Button onClick={this.props.handlers.next} disabled={!this.props.hasNext}>Próximo</Button>
        </div>
        <div>
          <h1>Filtrar Por Tipo</h1>
          {this.props.typeList.map((type) => <Button key={`${type}-filter`} onClick={() => this.props.handlers.filter(type)} >{type}</Button>)}
          <Button onClick={() => this.props.handlers.filter('any')}>Todos</Button>
        </div>
      </section>
    );
  }
}

class Pokedex extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      style: props.style,
      filteredList: this.getFilteredList('any'),
      typeList: this.getTypeList(),
      currentPokemonIndex: 0,
    }

    this.handleGetNextPokemon = this.handleGetNextPokemon.bind(this);
    this.handleFilterList = this.handleFilterList.bind(this);
  }

  handleFilterList(type) {
    this.setState({
      filteredList: this.getFilteredList(type),
      currentPokemonIndex: 0,
    });
  }

  handleGetNextPokemon() {
    this.setState((previousState) => {
      const currentIndex = previousState.currentPokemonIndex;

      if (currentIndex === previousState.filteredList.length - 1) {
        return {currentPokemonIndex: 0}
      } else {
        return {currentPokemonIndex: currentIndex + 1};
      }
    });
  }

  getFilteredList(type) {
    if (type === 'any') {
      return this.props.pokemonList;
    }

    return this.props.pokemonList.filter((pokemon) => pokemon.type.toLowerCase() === type.toLowerCase());
  }

  getTypeList() {
    return this.props.pokemonList.reduce((arr, pokemon) => {
      if (!arr.includes(pokemon.type)) {
        arr.push(pokemon.type);
      }
      return arr;
    }, []);
  }

  render() {
    let currentRender = null;

    if (this.state.style === 'list') {
      currentRender = this.state.filteredList.map((pokemon) => <Pokemon pokemonData={pokemon} key={pokemon.id}/>);
    } else {
      const currentPokemon = this.state.filteredList[this.state.currentPokemonIndex];
      currentRender = <Pokemon pokemonData={currentPokemon} key={currentPokemon.id} />;
    }

    return (
      <section className="pokedex">
        <h1 className="pokedex__heading">My Pokedex</h1>
        <ul className="pokedex__list">
          {currentRender}
        </ul>
        {this.state.style === 'single'
         ? <Controls
         handlers={{next: this.handleGetNextPokemon, filter: this.handleFilterList}}
         hasNext={this.state.filteredList.length > 1}
         typeList={this.state.typeList} />
         : null}
      </section>
    );
  }
}

ReactDOM.render(
  <App>
    <header>
      <h1>Dia 11.2 - Pokedex</h1>
    </header>
    <Pokedex pokemonList={POKEMONS} style="single"/>
    <footer>
      <p>Feito por <a target="_blank" href="https://github.com/heyset">Matheus "Set" Inacio</a>, 2021.</p>
      <p>Todos os direitos de imagem e nome da marca Pokémon&copy; são de autoria da Nintendo&reg;.</p>
    </footer>
  </App>,
  document.getElementById('root'),
);