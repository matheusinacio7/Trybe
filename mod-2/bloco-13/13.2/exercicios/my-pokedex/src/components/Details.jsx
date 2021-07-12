import React, { Component } from 'react';

export default class Details extends Component {
  render() {
    const { pokemon } = this.props.location.props;
    const { id, name, type, averageWeight, image, summary, moreInfo, foundAt, favorite } = pokemon;

    return (
      <main>
        <h1>{name}</h1>
        <img src={image} alt={`Pokemon n${id}: ${name}`} />
        <p>{type} pokemon, number {id}</p>
        {favorite ?  <p><img className="pokemon__favorite" src="https://upload.wikimedia.org/wikipedia/commons/e/e5/Full_Star_Yellow.svg" alt="star" /> This pokemon is a favorite of yours!</p> : null}
        <p>Average Weight: {averageWeight.value} {averageWeight.measurementUnit}</p>
        <p>{summary}</p>

        <ul>
          {foundAt.map((place) => (
          <li key={place.location}>
            <h1>{place.location}</h1>
            <img src={place.map} alt="map for pokemon"/>
          </li>
          ))}
        </ul>

        <a target="_blank" rel="noreferrer" href={moreInfo}>Read more at bulbapedia</a>
      </main>
    )
  }
}
