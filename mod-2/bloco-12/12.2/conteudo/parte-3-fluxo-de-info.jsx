class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>{this.props.children}</div>
  }
}

class EmailField extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <input
            type="email"
            name="email"
            placeholder="Qual seu email mais organizado?"
            onChange={this.props.handleChange}
            value={this.props.value}
            style={{outline: this.props.error ? '2px solid red' : null}}
        />
      </React.Fragment>
    );
  }
}

class NicknameField extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <input 
          type="text"
          name="nickname"
          placeholder="Qual seu nickname?"
          onChange={this.props.handleChange}
          value={this.props.value}
          style={{outline: this.props.error ? '2px solid red' : null}}
      />
    );
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
      errors: {
        nickname: 'Seu nickname deve ter entre 3 e 20 caracteres.',
        email: 'Seu email deve ser válido.',
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleError = this.handleError.bind(this)
    this.fileInput = React.createRef();
  }

  handleChange({ target }) {
    const { name } = target;
    const value = target.type !== 'checkbox' ? target.value : target.checked;

    this.setState({
      [name]: value,
    });

    this.handleError(name, value);
  }

  handleError(name, value) {
    const validators = {
      nickname: (userInput) => {
        if (userInput.length < 3 || userInput.length > 20) {
          return 'Seu nickname deve ter entre 3 e 20 caracteres.';
        } else {
          return null;
        }
      },
      email: (userInput) => {
        if (!/\w+@\w+\.\w+/i.test(userInput)) {
          return 'Seu email deve ser válido.'
        } else {
          return null;
        }
      }
    }

    if (!validators[name]) return;

    const errorMessage = validators[name](value);    

    this.setState(prev => {
      const errors = JSON.parse(JSON.stringify(prev.errors));
      errors[name] = errorMessage;

      return {errors};
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    const errorMessages = Object.values(this.state.errors);

    const hasErrors = errorMessages.find((value) => value !== null);

    if(hasErrors) {
      alert('ha erros!');
    }
  }

  render() {
    return(
      <form className="form" onSubmit={this.handleSubmit}>
        <NicknameField 
          value={this.state.nickname}
          handleChange={this.handleChange} 
          error={this.state.errors.nickname}
        />
        <EmailField 
          value={this.state.email} 
          handleChange={this.handleChange}
          error={this.state.errors.email}
        />
        
        <fieldset>
          <legend>Região Favorita de LoR</legend>
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