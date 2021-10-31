import express from 'express';
import cors from 'cors';
import rootRouter from './src/routers/root.js';
import cepRouter from './src/routers/cep.js';

import handleError from './src/middlewares/handleError.js';

const app = express();

app.use(
  cors(),
  express.json(),
);

app.use('/', rootRouter);
app.use('/cep', cepRouter);

app.use(handleError);

app.listen(process.env.PORT, () => {
  console.log('Server is up on port', process.env.PORT);
});
