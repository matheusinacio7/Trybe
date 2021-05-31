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
        name={this.props.name}
        cols="30"
        rows="10"
        onChange={this.props.onChange}
        onMouseOver={this.props.onMouseOver}
        maxLength={this.props.maxLength}
        value={this.props.value}
        placeholder={this.props.placeholder}
        required
      ></textarea>
    );
  }
}

class Resume extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { nome, email, cpf, endereco, cidade, estado, tipo, resumo, cargo, desc } = this.props.info;

    return (
      <div>
        <p>Nome: {nome}</p>
        <p>Email: {email}</p>
        <p>CPF: {cpf}</p>
        <p>Estado: {estado}</p>
        <p>Cidade: {cidade}</p>
        <p>Endereco: {endereco}, {tipo}</p>
        <p>Resumo do Curriculo: {resumo}</p>
        Ultimo emprego:
        <p>Cargo: {cargo}</p>
        <p>Descrição: {desc}</p>
      </div>
    );
  }
}

class Form extends React.Component {
  constructor(props) {
    super(props);
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
      hasAlertShowedUp: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleReset = this.handleReset.bind(this);
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

  handleBlur(e) {
    const { name, value } = e.target;

    if (/^\d+/.test(value)) {
      this.setState({[name]: ''});
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

  handleMouseOver() {
    if (!this.state.hasAlertShowedUp) {
      alert('Preencha com cuidado esta informação.');
      this.setState({hasAlertShowedUp: true});
    }
  }

  handleReset() {
    this.setState({
      nome: '',
      email: '',
      cpf: '',
      endereco: '',
      cidade: '',
      estado: 'AC',
      tipo: '',
      resumo: '',
      cargo: '',
      desc: ''
    });

    this.props.handleReset();
  }

  render() {
    return(
      <form onSubmit={(e) => this.props.handleSubmit(e, this.state)} onReset={this.handleReset}>
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
            onMouseOver={this.handleMouseOver}
            placeholder="Qual seu cargo?"
          />
          <Input
            name="desc"
            placeholder="Descreva o cargo detalhadamente"
            maxLength="500"
            value={this.state.desc}
            onChange={this.handleChange}
            type="text"
          />
        </fieldset>

        <input type="submit" value="Montar curriculo" />
        <input type="reset" value="Limpar" />
      </form>
    );
  }
}

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

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);