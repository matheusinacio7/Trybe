import React from 'react';

class Resume extends React.Component {
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

export default Resume;
