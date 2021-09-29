const fs = require('fs');
const express = require('express');
const cors = require('cors');

const app = express();

const rootRouter = require('./routers/root');

const PORT = 3001;

let error = null;

function resetData() {
  try {
    const writeStream = fs.createWriteStream('db/simpsons.json');
    const readStream = fs.createReadStream('assets/simpsons.json');

    readStream.pipe(writeStream);
  } catch (err) {
    error = err;
  }
}

resetData();

const handleInternalError = (_, res, next) => {
  if (error) return res.status(500).json({ message: 'Houve um interno no servidor. Pode ser preciso reiniciá-lo.' });

  next();
};

app.use(
  cors(),
  express.json(),
  handleInternalError,
);

app.use('/', rootRouter);

app.listen(PORT, () => console.log('O servidor está ativo na porta', PORT));
