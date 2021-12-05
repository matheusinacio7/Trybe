require('dotenv').config();
const express = require('express');

const authorsRouter = require('./routers/authors');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'src/views');

app.use('/authors', authorsRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});