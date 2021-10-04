import express from 'express';

const PORT = 3001;
const app = express();

app.use(express.json());

app.listen(PORT, () => console.log('Server is up on port', PORT));
