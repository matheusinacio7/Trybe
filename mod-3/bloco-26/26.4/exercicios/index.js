const fs = require('fs');
const express = require('express');
const cors = require('cors');

const app = express();

const rootRouter = require('./routers/root');
const simpsonsRouter = require('./routers/simpsons');
const usersRouter = require('./routers/user');

const { authentication } = require('./auth');

const PORT = 3001;

let error = null;

function resetData() {
  try {
    const writeStream = fs.createWriteStream('db/simpsons.json');
    const readStream = fs.createReadStream('assets/simpsons.json');

    readStream.pipe(writeStream);

    fs.promises.access('db/users.json', fs.constants.R_OK | fs.constants.W_OK)
      .then(() => undefined)
      .catch(() => {
        fs.promises.writeFile('db/users.json', '[]');
      });
  } catch (err) {
    error = err; // TODO conseguir lidar com o erro corretamente
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
app.use('/simpsons', authentication, simpsonsRouter);
app.use('/users', usersRouter);

app.listen(PORT, () => console.log('O servidor está ativo na porta', PORT));
