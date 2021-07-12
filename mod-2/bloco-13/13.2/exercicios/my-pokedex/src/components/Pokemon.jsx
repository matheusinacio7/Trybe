import React, { Component } from 'react';

const STAR_URLS = ['https://upload.wikimedia.org/wikipedia/commons/e/e7/Empty_Star.svg', 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Full_Star_Yellow.svg'];


export default class Pokemon extends Component {
  constructor(props) {
    super(props);

    this.handleClickDetails = this.handleClickDetails.bind(this);
  }

  handleClickDetails(e) {
    e.preventDefault();
    const { onClick, pokemonData } = this.props;
    const { id } = pokemonData;

    if(onClick) {
      onClick(id);
    }
  }

  render() {
    const { pokemonData, toggleFavorite } = this.props;
    const { id, name, type, averageWeight, image, moreInfo, favorite } = pokemonData;

    const starSource = favorite ? STAR_URLS[1] : STAR_URLS[0];

    return (
      <li className="pokemon">
        <img className="pokemon__favorite" src={starSource} alt={`Star representing that the pokemon is ${!favorite ? 'not' : null}  a favorite`} onClick={() => toggleFavorite(id)}/>
        <picture className="pokemon__picture" >
          <img src={image} alt={`Pokémon n${id}: ${name}`} />
        </picture>
        <h2 className="pokemon__number">#{id.toString(10).padStart(3, '0')}</h2>
        <h1 className="pokemon__name">{name}</h1>
        <p className="pokemon__details">
          <span>Type: {type}</span>
          <span>Avg. Weight: {averageWeight.value} {averageWeight.measurementUnit}</span>
          <span className="pokemon__link" onClick={this.handleClickDetails}>Details</span>
          <span className="pokemon__link"><a target="_blank" href={moreInfo} rel="noreferrer">Read more at bulbapedia</a></span>
        </p>
      </li>
    )
  }
}
