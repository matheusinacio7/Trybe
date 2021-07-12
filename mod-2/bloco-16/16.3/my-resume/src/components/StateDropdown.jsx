import React from 'react';
import STATES from '../data/brazilianStates';

class StateDropdown extends React.Component {
  render() {
    const { onChange, value } = this.props;

    return (
      <React.Fragment>
        <label htmlFor="form__estado">Estado</label>
        <select
          name="estado"
          id="form__estado" 
          value={value}
          onChange={onChange}
          required>
          {STATES.map(({name, acronym}) => <option key={acronym} value={acronym}>{name}</option>)}
        </select>
      </React.Fragment>
    );
  }
}

export default StateDropdown;