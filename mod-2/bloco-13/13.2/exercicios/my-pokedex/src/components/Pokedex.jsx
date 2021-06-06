import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Controls from './Controls';
import Pokemon from './Pokemon';

export default class Pokedex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listStyle: props.listStyle,
      filteredList: this.getFilteredList('any'),
      typeList: this.getTypeList(),
      currentPokemonIndex: 0,
      redirecting: null
    }

    this.handleGetNextPokemon = this.handleGetNextPokemon.bind(this);
    this.handleFilterList = this.handleFilterList.bind(this);
    this.handleCardClick = this.handleCardClick.bind(this);
  }

  handleCardClick(id) {
    this.setState({
      redirecting: id,
    });
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
    let currentPokemon = null;
    
    if (this.state.listStyle === 'list') {
      currentRender = this.state.filteredList.map((pokemon) => <Pokemon pokemonData={pokemon} key={pokemon.id}/>);
    } else {
      currentPokemon = this.state.filteredList[this.state.currentPokemonIndex];
      currentPokemon.favorite = this.props.favorites[currentPokemon.id] ? true : false;
      currentRender = <Pokemon pokemonData={currentPokemon} key={currentPokemon.id} onClick={this.handleCardClick} toggleFavorite={this.props.handleToggleFavorite} />;
    }
    
    if (this.state.redirecting) {
      return <Redirect push to={{
        pathname: `/pokemons/${this.state.redirecting}`,
        props: {pokemon: currentPokemon},
      }} />
    }

    return (
      <section className="pokedex">
        <h1 className="pokedex__heading">My Pokedex</h1>
        <ul className="pokedex__list">
          {currentRender}
        </ul>
        {this.state.listStyle === 'single'
         ? <Controls
         handlers={{next: this.handleGetNextPokemon, filter: this.handleFilterList}}
         hasNext={this.state.filteredList.length > 1}
         typeList={this.state.typeList} />
         : null}
      </section>
    );
  }
}
