import React from 'react'

export default function NewItem() {
  return (
    <section>
      <h1>Adicionar nova tarefa</h1>
      <form>
        <input type="text" placeholder="O que você tem para fazer?" />
        <button type="submit">Criar</button>
      </form>
    </section>
  );
}
