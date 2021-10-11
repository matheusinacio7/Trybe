import express from 'express';
import cors from 'cors';
import rootRouter from './src/routers/root.js';

const app = express();

app.use(
  cors(),
  express.json(),
);

app.use('/', rootRouter);

app.listen(process.env.PORT, () => {
  console.log('Server is up on port', process.env.PORT);
});
