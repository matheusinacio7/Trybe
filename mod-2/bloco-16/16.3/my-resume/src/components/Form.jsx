import React from 'react';
import TextInput from './TextInput';
import TextArea from './TextArea';
import StateDropdown from './StateDropdown';

import { withStore } from '../utils/withStore';
import { resetInfo, updateInfo } from '../actions';

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
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  validators = {
    uppercaseValues(str) {
      return str.toUpperCase();
    },
    removeSpecialChars(str) {
      const filteredString = str.match(/[(\w|.|,|\s)]/gi);
      return filteredString ? filteredString.join('') : '';
    },
    checkIfStartsWithNum(str) {
      if(/^\d+/.test(str)) {
        return '';
      } else {
        return str;
      }
    },
    alertIfItsNotTrybe(str) {
      if(!/trybe@gmail.com/.test(str)) {
        alert('O email precisa ser "trybe@gmail.com"');
        return '';
      } else {
        return str;
      }
    }
  }

  handleBlur(e, options) {
    const { name, value } = e.target;

    if(options && options.validator) {
      const validatedValue = options.validator(value);
      this.setState({[name]: validatedValue});
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

  handleSubmit(e) {
    e.preventDefault();

    this.props.updateInfo(this.state);
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

    this.props.resetInfo();
  }

  render() {
    return(
      <form onSubmit={ this.handleSubmit } onReset={this.handleReset}>
        <fieldset>
          <legend>Dados Pessoais</legend>
          <TextInput
            name="nome"
            placeholder="Nome"
            maxLength="40"
            value={this.state.nome}
            onChange={(e) => this.handleChange(e, {validator: this.validators.uppercaseValues})}
            type="text"
          />
          <TextInput
            name="email"
            placeholder="Email"
            maxLength="50"
            value={this.state.email}
            onBlur={(e) => this.handleBlur(e, {validator: this.validators.alertIfItsNotTrybe})}
            onChange={this.handleChange}
            type="email"
          />
          <TextInput
            name="cpf"
            placeholder="CPF"
            maxLength="11"
            value={this.state.cpf}
            onChange={this.handleChange}
            type="text"
          />
          <TextInput
            name="endereco"
            placeholder="Endereço"
            maxLength="200"
            value={this.state.endereco}
            onChange={(e) => this.handleChange(e, {validator: this.validators.removeSpecialChars})}
            type="text"
          />
          <TextInput
            name="cidade"
            placeholder="Cidade"
            maxLength="28"
            value={this.state.cidade}
            onBlur={(e) => this.handleBlur(e, {validator: this.validators.checkIfStartsWithNum})}
            onChange={this.handleChange}
            type="text"
          />
          <StateDropdown
            value={this.state.estado}
            onChange={this.handleChange}
          />
          <label>
            Apartamento
            <TextInput
              type="radio"
              name="tipo"
              value="apartamento"
              onChange={this.handleChange}
              checked={this.state.tipo === 'apartamento'}
            />
          </label>
          <label>
            Casa
            <TextInput
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
          <TextInput
            name="desc"
            placeholder="Descreva o cargo detalhadamente"
            maxLength="500"
            value={this.state.desc}
            onChange={this.handleChange}
            type="text"
          />
        </fieldset>

        <TextInput type="submit" value="Montar curriculo" />
        <TextInput type="reset" value="Limpar" />
      </form>
    );
  }
}

export default withStore(Form, null, [updateInfo, resetInfo]);
