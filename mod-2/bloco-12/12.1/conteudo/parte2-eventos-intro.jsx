class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>{this.props.children}</div>
  }
}

/* Embora isso funcione, essa DEFINITIVAMENTE
não é a maneira correta de se criar eventos
em React! A função se refere ao componente,
então deve ser parte de sua classe! */
function handleClick(e) {
  const name = e.target.innerText;
  
  console.log(`Olá, eu sou o ${name}!`);
}

ReactDOM.render(
  /* Repare que, diferentemente do HTML, no
  JSX você associa uma função a um evento
  passando a própria função entre chaves `{}` */
  <App>
    <button onClick={handleClick}>Botão 1</button>
    <button onClick={handleClick}>Botão 2</button>
    <button onClick={handleClick}>Botão 3</button>
  </App>,
  document.getElementById('root'),
);