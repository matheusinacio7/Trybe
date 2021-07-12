class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>{this.props.children}</div>
  }
}


class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      favoriteRegion: 'targon',
      nickname: '',
      email: '',
      reason: '',
      agreement: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileInput = React.createRef();
  }

  handleChange({ target }) {
    const { name } = target;
    const value = target.type !== 'checkbox' ? target.value : target.checked;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    return(
      <form className="form" onSubmit={this.handleSubmit}>
        <input 
          type="text"
          name="nickname"
          placeholder="Qual seu nickname?"
          onChange={this.handleChange}
          value={this.state.nickname}
        />
        <input
          type="email"
          name="email"
          placeholder="Qual seu email mais organizado?"
          onChange={this.handleChange}
          value={this.state.email}
        />
        
        <fieldset>
          <legend>Região Favoita de LoR</legend>
          <label htmlFor="form__favorite-region">Escolha sua Região Favorita do LoR</label>
          <select
            name="favoriteRegion"
            id="form__favorite-region"
            value={this.state.favoriteRegion}
            onChange={this.handleChange}
            >
            <option value="demacia">Demacia</option>
            <option value="noxus">Noxus</option>
            <option value="ionia">Ionia</option>
            <option value="freljord">Freljord</option>
            <option value="shadow-isles">Shadow Isles</option>
            <option value="piltover-and-zaun">Piltover &amp; Zaun</option>
            <option value="bilgewater">Bilgewater</option>
            <option value="targon">Targon</option>
            <option value="shurima">Shurima</option>
          </select>
          <textarea
          name="reason"
          cols="30"
          rows="10"
          placeholder="Descreva o motivo de você preferir esta região."
          onChange={this.handleChange}
          value={this.state.reason}
          ></textarea>
        </fieldset>
        <label>
          Envie fotos do CPF, Certidão de Nascimento e Frente e Verso de um cartão de crédito com muito limite:
          <input type="file" ref={this.fileInput} multiple/>
        </label>
        <input type="submit" value="Votar!" />
        <div>
          <label htmlFor="form__agreement">Aceito compartilhar todas as minhas informações com ladrões de dados</label>
          <input
            type="checkbox"
            name="agreement" 
            id="form__agreement"
            onChange={this.handleChange}
            checked={this.state.agreement}
            />
        </div>
      </form>
    );
  }
}


ReactDOM.render(
  <App>
    <Form />
  </App>,
  document.getElementById('root'),
);