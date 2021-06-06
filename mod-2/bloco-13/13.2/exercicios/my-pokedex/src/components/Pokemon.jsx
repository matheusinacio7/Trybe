import React, { Component } from 'react'

export default class Pokemon extends Component {
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
