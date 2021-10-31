import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

import { catchInvalidEndpoint, handleError } from '@middlewares';
import * as routers from '@routers';

const app = express();
const PORT = process.env.PORT || 3030;

app.use(
  express.json(),
  helmet(),
  cors()
);

app.use('/', routers.root);
app.use('/users', routers.user);
app.use('/files', routers.files);

app.use(catchInvalidEndpoint);

app.use(handleError);

app.listen(PORT, () => {
  console.log('Server is up on port', PORT);
});
