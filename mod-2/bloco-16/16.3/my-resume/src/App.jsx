import React from 'react';
import './App.css';
import { Form, Resume } from './components';
import { withStore } from './utils/withStore';

class App extends React.Component {
  render() {
    const { resume } = this.props;

    return (
    <div>
      <Form />
      {resume.hasInfo && <Resume />}
    </div>)
  }
}

export default withStore(App, ['resume']);
