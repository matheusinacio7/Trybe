import express from 'express';
import userRouter from './src/routers/user.js';

const app = express();

app.use(express.json());

app.use('/user', userRouter);

app.listen(process.env.PORT, () => {
  console.log('Server up on port', process.env.PORT);
});
