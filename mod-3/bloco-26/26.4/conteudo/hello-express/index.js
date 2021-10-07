const express = require('express');

const app = express(); // 1

function handleHelloWorldRequest(req, res) {
  res.status(200).send('Hello World!'); // 4
}

app.get('/hello', handleHelloWorldRequest); // 2

app.listen(3001, () => {
  console.log('Aplicação ouvindo na porta 3001');
}); // 3
