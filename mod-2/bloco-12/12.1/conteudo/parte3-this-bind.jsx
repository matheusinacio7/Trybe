class App extends React.Component {
  constructor(props) {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    const name = e.target.innerText;
    console.log(this);
    
    console.log(`Olá, eu sou o ${name}!`);
  }

  render() {
    return (
    <div>
      <button onClick={this.handleClick}>Botão 1</button>
      <button onClick={this.handleClick}>Botão 2</button>
      <button onClick={this.handleClick}>Botão 3</button>
    </div>)
  }
}


ReactDOM.render(
  <App></App>,
  document.getElementById('root'),
);