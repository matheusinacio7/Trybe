class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>{this.props.children}</div>
  }
}

const ESTADOS = [
  { name: 'Acre', acronym: 'AC',},
  { name: 'Alagoas', acronym: 'AL',},
  { name: 'Amapá', acronym: 'AP',},
  { name: 'Amazonas', acronym: 'AM',},
  { name: 'Bahia', acronym: 'BA',},
  { name: 'Ceará', acronym: 'CE',},
  { name: 'Distrito Federal', acronym: 'DF',},
  { name: 'Espírito Santo', acronym: 'ES',},
  { name: 'Goiás', acronym: 'GO',},
  { name: 'Maranhão', acronym: 'MA',},
  { name: 'Mato Grosso', acronym: 'MT',},
  { name: 'Mato Grosso do Sul', acronym: 'MS',},
  { name: 'Minas Gerais', acronym: 'MG',},
  { name: 'Pará', acronym: 'PA',},
  { name: 'Paraíba ', acronym: 'PB',},
  { name: 'Paraná', acronym: 'PR',},
  { name: 'Pernambuco', acronym: 'PE',},
  { name: 'Piauí', acronym: 'PI',},
  { name: 'Rio de Janeiro', acronym: 'RJ',},
  { name: 'Rio Grande do Norte', acronym: 'RN',},
  { name: 'Rio Grande do Sul ', acronym: 'RS',},
  { name: 'Rondônia', acronym: 'RO',},
  { name: 'Roraima', acronym: 'RR',},
  { name: 'Santa Catarina ', acronym: 'SC',},
  { name: 'São Paulo ', acronym: 'SP',},
  { name: 'Sergipe', acronym: 'SE',},
  { name: 'Tocantins', acronym: 'TO',},
]

class StateDropdown extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <label htmlFor="form__estado">Estado</label>
        <select
          name="estado"
          id="form__estado" 
          value={this.props.value}
          onChange={this.props.onChange}
          required>
          {ESTADOS.map(({name, acronym}) => <option key={acronym} value={acronym}>{name}</option>)}
        </select>
      </React.Fragment>
    );
  }
}

class Input extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <input 
        name={this.props.name}
        placeholder={this.props.placeholder}
        maxLength={this.props.maxLength}
        type="text"
        value={this.props.value}
        onBlur={this.props.onBlur}
        onChange={this.props.onChange}
        type={this.props.type}
        validator={this.props.validator}
        required
      />
    );
  }
}

class TextArea extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <textarea 
        name="resumo"
        cols="30"
        rows="10"
        onChange={this.props.onChange}
        maxLength={this.props.maxLength}
        value={this.props.value}
        placeholder={this.props.placeholder}
        required
      ></textarea>
    );
  }
}

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      nome: '',
      email: '',
      cpf: '',
      endereco: '',
      cidade: '',
      estado: 'AC',
      tipo: '',
      resumo: '',
      cargo: '',
      desc: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  validators = {
    uppercaseValues(str) {
      return str.toUpperCase();
    },
    removeSpecialChars(str) {
      const filteredString = str.match(/[(\w|.|,|\s)]/gi);
      return filteredString ? filteredString.join('') : '';
    }
  }

  handleChange(e, options) {
    const { name, value, maxLength } = e.target;

    if (maxLength > 0 && value.length >= maxLength) return;

    if(options && options.validator) {
      const validatedValue = options.validator(value);
      this.setState({[name]: validatedValue});
      return;
    }

    this.setState({[name]: value});
  }

  handleBlur(e) {
    const { name, value } = e.target;

    if (/^\d+/.test(value)) {
      this.setState({[name]: ''});
    }
  }

  render() {
    return(
      <form>
        <fieldset>
          <legend>Dados Pessoais</legend>
          <Input
            name="nome"
            placeholder="Nome"
            maxLength="40"
            value={this.state.nome}
            onChange={(e) => this.handleChange(e, {validator: this.validators.uppercaseValues})}
            type="text"
          />
          <Input
            name="email"
            placeholder="Email"
            maxLength="50"
            value={this.state.email}
            onChange={this.handleChange}
            type="email"
          />
          <Input
            name="cpf"
            placeholder="CPF"
            maxLength="11"
            value={this.state.cpf}
            onChange={this.handleChange}
            type="text"
          />
          <Input
            name="endereco"
            placeholder="Endereço"
            maxLength="200"
            value={this.state.endereco}
            onChange={(e) => this.handleChange(e, {validator: this.validators.removeSpecialChars})}
            type="text"
          />
          <Input
            name="cidade"
            placeholder="Cidade"
            maxLength="28"
            value={this.state.cidade}
            onBlur={this.handleBlur}
            onChange={this.handleChange}
            type="text"
          />
          <StateDropdown
            value={this.state.estado}
            onChange={this.handleChange}
          />
          <label>
            Apartamento
            <input
              type="radio"
              name="tipo"
              value="apartamento"
              onChange={this.handleChange}
              checked={this.state.tipo === 'apartamento'}
            />
          </label>
          <label>
            Casa
            <input
              type="radio"
              name="tipo"
              value="casa"
              onChange={this.handleChange}
              checked={this.state.tipo === 'casa'}
            />
          </label>
        </fieldset>

        <fieldset>
          <legend>Último Emprego</legend>
          <TextArea 
            name="resumo"
            maxLength="1000"
            value={this.state.resumo}
            onChange={this.handleChange}
            placeholder="Resuma o seu curriculo aqui."
          />
          <TextArea
            name="cargo"
            maxLength="40"
            value={this.state.cargo}
            onChange={this.handleChange}
            placeholder="Qual seu cargo?"
          />
          <Input
            name="descricao-cargo"
            placeholder="Descreva o cargo detalhadamente"
            maxLength="500"
            value={this.state.desc}
            onChange={this.handleChange}
            type="text"
          />
        </fieldset>

        <input type="submit" value="Montar curriculo" />
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