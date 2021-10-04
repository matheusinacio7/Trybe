import express from 'express';

import handleError from './middlewares/handleError.js';

import userRouter from './routers/user.js';
import btcRouter from './routers/btc.js';

const PORT = 3001;
const app = express();

app.use(express.json());

app.use('/user', userRouter);
app.use('/btc', btcRouter);

app.use(handleError);

app.listen(PORT, () => console.log('Server is up on port', PORT));
