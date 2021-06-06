import React, { Component } from 'react';
import Button from './Button';

export default class Controls extends Component {render() {
    return (
      <section className='controls'>
        <div>
          <Button onClick={this.props.handlers.next} disabled={!this.props.hasNext}>Próximo</Button>
        </div>
        <div>
          <h1>Filtrar Por Tipo</h1>
          <ul className='controls__filters'>
            {this.props.typeList.map((type) => <li key={`${type}-filter`}><Button onClick={() => this.props.handlers.filter(type)} >{type}</Button></li>)}
            <li key='any-filter'><Button onClick={() => this.props.handlers.filter('any')}>Todos</Button></li>
          </ul>
        </div>
      </section>
    );
  }
}
