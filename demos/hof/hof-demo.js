const pessoas = ['Chavez', 'Chiquinha', 'Kiko', 'Seu Madruga', 'Bruxa do 71', 'Seu Barriga', 'Seu Girafales', 'Pópis', 'Nhonho'];

function filtrar(arrayPessoas, filtro) {
  const arrayFiltrado = [];

  for (let pessoa of arrayPessoas) {
    if (filtro(pessoa)) {
      arrayFiltrado.push(pessoa);
    }
  }

  return arrayFiltrado;
}

let pessoasFiltradas = filtrar(pessoas, (pessoa) => pessoa[0] !== 'S');

pessoasFiltradas = filtrar(pessoasFiltradas, (pessoa) => pessoa[0] !== 'C');
pessoasFiltradas = filtrar(pessoasFiltradas, (pessoa) => pessoa[0] !== 'P');

pessoasFiltradas = filtrar(pessoasFiltradas, (pessoa) => pessoa.length <= 5);

console.log('oi');

const ditador = 'Dona Florinda';
