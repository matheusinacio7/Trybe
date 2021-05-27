class App extends React.Component {
  constructor(props) {
    super();
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      counters: [0, 0, 0],
      colors: ['white', 'white', 'white'],
    }
  }

  handleClick(e) {
    const name = e.target.innerText;
    const index = parseInt(e.target.dataset.position);
    this.setState((previous) => {
      const counters = [...previous.counters];
      counters[index] += 1;
      const colors = [...previous.colors];

      if (counters[index] % 2) {
        colors[index] = 'white';
      } else {
        colors[index] = 'green';
      }

      return {
        counters,
        colors,
      };
    });
    
    console.log(`Olá, eu sou o ${name}! Eu sou da cor ${this.state.colors[index]}`);
  }

  render() {
    return (
    <div>
      <button onClick={this.handleClick} data-position='0' style={{backgroundColor: this.state.colors[0]}}>Botão 1. Clicado {this.state.counters[0]}x</button>
      <button onClick={this.handleClick} data-position='1' style={{backgroundColor: this.state.colors[1]}}>Botão 2. Clicado {this.state.counters[1]}x</button>
      <button onClick={this.handleClick} data-position='2' style={{backgroundColor: this.state.colors[2]}}>Botão 3. Clicado {this.state.counters[2]}x</button>
    </div>)
  }
}


ReactDOM.render(
  <App></App>,
  document.getElementById('root'),
);