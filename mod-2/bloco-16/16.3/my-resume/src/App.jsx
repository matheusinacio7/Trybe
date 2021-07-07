import React from 'react';
import './App.css';
import { Form, Resume } from './components';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentInfo: {},
      hasInfo: false,
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleReset() {
    console.log('eita');
    this.setState({currentInfo: {}, hasInfo: false});
  }

  handleSubmit(e, info) {
    e.preventDefault();
    this.setState({currentInfo: info, hasInfo: true});
  }

  render() {
    return (
    <div>
      <Form handleSubmit={this.handleSubmit} handleReset={this.handleReset} />
      {this.state.hasInfo && <Resume info={this.state.currentInfo} />}
    </div>)
  }
}

export default App;
