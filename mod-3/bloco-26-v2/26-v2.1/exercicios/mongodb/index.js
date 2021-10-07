import express from 'express';

const app = express();

app.use(express.json());

app.listen(process.env.PORT, () => {
  console.log('Server up on port', process.env.PORT);
});
