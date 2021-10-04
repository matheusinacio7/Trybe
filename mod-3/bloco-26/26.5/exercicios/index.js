import express from 'express';

import userRouter from './routers/user.js';
import handleError from './middlewares/handleError.js';

const PORT = 3001;
const app = express();

app.use(express.json());

app.use('/user', userRouter);

app.use(handleError);

app.listen(PORT, () => console.log('Server is up on port', PORT));
